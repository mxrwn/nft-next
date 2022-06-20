import { useRouter } from 'next/router'
import { getNFT, isOnMarket, createSale, getUserAddress, addView, getViews, getLikes, getBaseNFT, removeLike, addLike } from './../../API/nfts.js'
import styles from './../../sass/pages/_nft.module.sass'
import Button from './../../components/button'
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../../components/loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons'

import heart from './../../assets/icons/heart-plus.png'
import heart_full from './../../assets/icons/heart-plus-full.png'

export default function NFT() {
  const router = useRouter()
  const [nft, setNft] = useState({});
  const [buy, setBuy] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const { id } = router.query
  useEffect(() => {
    if(id){
      initNFT()
    }
    
    
  }, [id]);

  const initNFT = async () => {
    // setLoading(true)
    setUserAddress(await getUserAddress());
    const dbNFT = await getBaseNFT(id)
    console.log(dbNFT.likes, userAddress)
    const likedNFT = dbNFT.likes.find(like => like === userAddress);
    console.log(likedNFT)
    if(likedNFT) {
      setLiked(true)
    }
    setNft({...await getNFT(id), ...dbNFT})
    await addView(id);
    
    const item = await isOnMarket(id)
    console.log(item)
    setBuy(item)
    setTimeout(() => {setLoading(false)}, 4000)
  }

  const buyNFT = async () => {
    createSale(buy.tokenId, buy.price)

  }

  const toggleLike = async () => {
    if(liked) {
      await removeLike(id)
      setLiked(false)
    } else {
      await addLike(id)
      setLiked(true)
    }
  }

  return (
    
    <div className={styles.nft}>
      {
        loading ? <LoadingAnimation/> : ''
      }
      {nft ? 
        <>
        <div className={styles.image}>
        <div className={styles.info}>
          <div className={styles.left}>
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
          </div>
          <div className={styles.right}>
            <div className={styles.category}>
              {nft.category}
            </div>
            
          </div>
          </div>
          <img src={nft.image}/>
          <div className={styles.image_info}>
              <p className={styles.image_info_views}>
              { nft.views } views
              </p>
            <div className={styles.image_info_likes}>
            <p>
            { nft.likes ? nft.likes.length : ''}</p> <img src={liked ? heart_full.src : heart.src} onClick={() => toggleLike()}/>
              
            </div>
           
          </div>
        </div>
          <div className={styles.buy}>
            <h1>{buy.price} ETH</h1>
          {
            buy ? 
              buy.owner !== userAddress ?
                buy.seller !== userAddress ?
            <Button onClick={() => buyNFT()}>
              <h2>Buy this NFT</h2>
            </Button>
            :
            <Button onClick={() => buyNFT()} disabled>
              <h2>Buy this NFT</h2>
            </Button>
            :
            <Button onClick={() => buyNFT()} disabled>
              <h2>Buy this NFT</h2>
            </Button>
            :
            <Button onClick={() => buyNFT()} disabled>
              <h2>Buy this NFT</h2>
            </Button>
          }
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
