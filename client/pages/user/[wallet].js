import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createBaseNFT, createMarketItem, createNFT, deleteVerification, fetchCreatedItems, getMyNFTs, getUserAddress, getVerificationRequests, loadNFTs } from '../../API/nfts';
import { get } from '../../API/users';
import Button from '../../components/button';
import styles from './../../sass/pages/_user.module.sass'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import { post } from '../../API/activities';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


export default function User() {
  
  const router = useRouter()
  const { wallet } = router.query
  const [user, setUser] = useState({});
  const [nfts, setNfts] = useState([]);
  const [pending, setPending] = useState([]);
  useEffect(() => {
    if(wallet){
      getUser()
    }
  }, [wallet]);

  useEffect(() => {
    console.log(user)
  }, [user]);

  async function getUser() {
    console.log(await get(wallet))
    setUser(await get(wallet))
    const allNFTs = await fetchCreatedItems()
    console.log(allNFTs)
    const pendingNFTs = await getVerificationRequests();
    if(allNFTs) {
      console.log(allNFTs.filter(nft => nft.seller === wallet))
      setNfts(allNFTs.filter(nft => nft.seller === wallet))
    }
    if(pendingNFTs){
      setPending(pendingNFTs.filter(nft => nft.user === wallet))
    }
  }

  async function buyNFT({_id, name, description, fileUrl, creator, category, price}) {
    const data = JSON.stringify({
      name, description, image: fileUrl, creator: await getUserAddress(), category
    })
    console.log(data)
    try {
      const added = await client.add(data)
      const metadata = `https://ipfs.infura.io/ipfs/${added.path}`
      const tokenId = await createNFT(metadata)
      console.log(tokenId)
      await post(await getUserAddress(), {
        title: `${name} created!`,
        price,
        from: 'you'
      })
      const item = await createMarketItem(tokenId, price.toString());
      console.log(item, price.toString())
      await createBaseNFT(tokenId)
      await deleteVerification(_id)
      // router.push(`/nft/${tokenId}`)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className={styles.user}>
      <div className={styles.head}>
        <div className={styles.head_image} style={{background: user.image}}>
        </div>
        <div className={styles.head_name}>
          <h2>{user.name}</h2>
        </div>
      </div>
      <div className={styles.body}>
      {
        nfts[0] ?
        <>
        <h1>NFTs</h1>
        <div className={styles.body_nfts}>
          {
           
            nfts.map(nft => (
              <Link href={`/nft/${nft.tokenId}`} key={nft.tokenId}>
                <div className={styles.body_nfts_nft}>
                <img src={nft.image}/>
                <div className={styles.body_nfts_info}>
                  <p>{nft.name}</p><p>{nft.price}</p>
                </div>
                </div>
              </Link>
            ))
            
            
          }
          
        </div>
        
        
        
        </>
        :
        <div className={styles.no_nfts}>
          <h1>Looks like you didn't mint a NFT yet.</h1>
          <Link href={'/create'}>
            <Button>
              Let's create one!
            </Button>
          </Link>
        </div>
        
      }
      {
        pending[0] && (<><h1>Pending NFTs</h1>
        <div className={styles.pending_nfts}>
          {
            pending ?
              pending.map(nft => (
                  <div className={styles.body_nfts_nft}>
                  <img src={nft.fileUrl}/>
                  <div className={styles.body_nfts_info}>
                    
                    {
                      nft.accept ?
                      <Button onClick={() => {
                        buyNFT(nft)
                        router.push('/')
                        }}>
                        Create
                      </Button>
                      :
                      <>
                      <p>{nft.name}</p><p>{nft.price}</p>
                      </>
                      
                    }
                    
                  </div>
                  </div>
              ))
              :
              ''
          }

        </div></>)
      }
      </div>
    </div>
  )
}
