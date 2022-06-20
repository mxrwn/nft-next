import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../components/button';
import styles from './../../sass/pages/_nft.module.sass'
import { acceptVerification, declineVerification, getNFT, getVerificationRequest } from './../../API/nfts'
export default function DashboardNFT() {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setnft] = useState({});
  const [verified, setVerified] = useState({});
  useEffect(() => {
    async function getVerification() {
      setnft(await getVerificationRequest(id))
    }
    if(id) {
      getVerification()
      console.log(styles)
    }
  }, [id]);

  useEffect(() => {
    async function getTheNFT() {
      setVerified(await getNFT(nft.tokenId))
    }
    if(nft.tokenId) {
      getTheNFT()
    }
  }, [nft]);
  return (
  <div className={styles.nfts}>
  <div className={styles.nft}>
      {nft ? 
        <>
        <div className={styles.image}>
        <div className={styles.info}>
          <div className={styles.left}>
          <div className={styles.info_title}>
            <h1>{nft.name}</h1>
          </div>
          <div className={styles.info_owner}>
            <h3>Owned by {nft.address}</h3>
          </div>
          </div>
          <div className={styles.right}>
            <div className={styles.category}>
              {nft.category}
            </div>
          </div>
          </div>
          <img src={nft.fileUrl}/>
        </div>
          <div className={styles.buy}>
            <Button onClick={() => {
              acceptVerification(id)
              router.push('/dashboard')
              }}>
              <h2>Accept</h2>
            </Button>
            <Button onClick={() => {
              declineVerification(id)
              router.push('/dashboard')
              }}>
              <h2>Decline</h2>
            </Button>
        </div>
        </>
        :
        <div className={styles.undef}>
          <h1>Oops... This NFT does not exist</h1>
        </div>
      }
    </div>
    <div className={styles.nft}>
      {verified ? 
        <>
        <div className={styles.image}>
        <div className={styles.info}>
          <div className={styles.left}>
          <div className={styles.info_title}>
            <h1>{verified.name}</h1>
          </div>
          <div className={styles.info_owner}>
            <h3>Owned by {verified.owner}</h3>
          </div>
          </div>
          <div className={styles.right}>
            <div className={styles.category}>
              {verified.category}
            </div>
          </div>
          </div>
          <img src={verified.image}/>
        </div>
        </>
        :
        <div className={styles.undef}>
          <h1>Oops... This NFT does not exist</h1>
        </div>
      }
    </div>
  </div>
    
  )
}
