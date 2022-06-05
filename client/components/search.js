import React from 'react'
import styles from './../sass/components/_search.module.sass'

export default function Search() {
  return (
    <div className={styles.search}>
      <input type='search' placeholder='Search...'/>
      <div className={styles.search_box}>
        <NFTs/>
        <Users/>
      </div>
    </div>
  )
}

const NFTs = () => {
  return (
    <div className={styles.search_nfts}>
      <div className={styles.search_nfts_nft}>
        <p>TEEEST</p>
        <p>TEEEST</p>
        <p>TEEEST</p>
        <p>TEEEST</p>
        <p>TEEEST</p>
        <p>TEEEST</p>
        <p>TEEEST</p>
      </div>
    </div>
  )
}

const Users = () => {
  return (
    <div className={styles.search_users}>

    </div>
  )
}