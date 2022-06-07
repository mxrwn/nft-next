import { useRouter } from 'next/router'
import { getNFT, isOnMarket, createSale } from './../../API/nfts.js'
import styles from './../../sass/pages/_nft.module.sass'
import Button from './../../components/button'
import React, { useEffect, useState } from 'react'

export default function NFT() {
  const router = useRouter()
  const [nft, setNft] = useState({});
  const [buy, setBuy] = useState(false)
  const { id } = router.query
  useEffect(() => {
    if(id){
      initNFT()
    }
    
    
  }, [id]);

  const initNFT = async () => {
    console.log(id)
    setNft(await getNFT(id))
    const item = await isOnMarket(id)
    setBuy(item)
  }
  useEffect(() => {
    console.log(nft)
  }, [nft]);

  useEffect(() => {
    console.log(buy)
  }, [buy]);

  const buyNFT = async () => {
    createSale(buy.tokenId, buy.price)

  }

  return (
    
    <div className={styles.nft}>
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
            <h3>Owned by <span>{nft.owner}</span></h3>
          </div>
          <div className={styles.info_description}>
            <h2>{nft.description}</h2>
          </div>
          <div className={styles.buy}>
          {
            buy ? 
            <Button onClick={() => buyNFT()}>
              Buy for {buy.price} MATIC
            </Button>
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
