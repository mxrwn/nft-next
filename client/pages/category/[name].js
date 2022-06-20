import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getByCategory } from '../../API/nfts';
import styles from './../../sass/pages/_category.module.sass'
import Link from 'next/link';

export default function Category() {
  const router = useRouter()
  const { name } = router.query
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    if(name){
      console.log(name)
      async function getNfts() {
        const nft = await getByCategory(name.charAt(0).toUpperCase() + name.slice(1))
        console.log(nft)
        setNfts(nft)
      }
      getNfts()
    }
  }, [name]);

  useEffect(() => {
    console.log(nfts)
  }, [nfts]);
  
  return (
      <div className={styles.allnfts}>
        <h1>Category {'>'} {name ? name.charAt(0).toUpperCase() + name.slice(1) : ''}</h1>
        <div className={styles.allnfts_data}>
          {
            nfts.map((nft, i) => (
              <Link href={`/nft/${nft.tokenId}`} key={i}>
              <div className={styles.nft} key={nft.tokenId}>
                
                <div className={styles.image}>
                  <img src={nft.image}/>
                </div>
              </div>
              </Link>
            ))
          }
        </div>
      </div>
  )
}
