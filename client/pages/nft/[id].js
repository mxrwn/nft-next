import { useRouter } from 'next/router'
import { getNFT, isOnMarket, createSale, getUserAddress } from './../../API/nfts.js'
import styles from './../../sass/pages/_nft.module.sass'
import Button from './../../components/button'
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../../components/loading.js'

export default function NFT() {
  const router = useRouter()
  const [nft, setNft] = useState({});
  const [buy, setBuy] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = router.query
  useEffect(() => {
    if(id){
      initNFT()
    }
    
    
  }, [id]);

  const initNFT = async () => {
    setLoading(true)
    console.log(await getUserAddress())
    setUserAddress(await getUserAddress());
    console.log(id)
    setNft(await getNFT(id))
    console.log(id)
    const item = await isOnMarket(id)
    setBuy(item)
    setTimeout(() => {setLoading(false)}, 4000)
  }

  const buyNFT = async () => {
    createSale(buy.tokenId, buy.price)

  }

  useEffect(() => {
    
    console.log(buy, nft)
  }, [buy, nft]);

  return (
    
    <div className={styles.nft}>
      {
        loading ? <LoadingAnimation/> : ''
      }
      {nft ? 
        <>
        <div className={styles.image}>
          <img src={nft.image}/>
        </div>
        <div className={styles.info}>
          <div className={styles.info_title}>
            <h1>{nft.name}</h1>
          </div>
          <div className={styles.info_owner}>
            <h3>Owned by <span>{
              buy ? 
                buy.owner === "0x0000000000000000000000000000000000000000" ?
                  buy.seller === userAddress ? 'you' : buy.seller
                :
                  buy.owner === userAddress ? 'you' : buy.owner
              :
              nft.creator === userAddress ? 'you' : nft.creator
            }</span></h3>
          </div>
          <div className={styles.info_description}>
            <h2>{nft.description}</h2>
          </div>
          <div className={styles.buy}>
          {
            buy ? 
              buy.owner !== userAddress ?
            <Button onClick={() => buyNFT()}>
              Buy for {buy.price} MATIC
            </Button>
            :
            ''
            :
            ''
          }
        </div>
        </div>

        </>
        :
        <div className={styles.undef}>
          <h1>Oops... This NFT does not exist</h1>
        </div>
      }
      
    </div>
  )
}
