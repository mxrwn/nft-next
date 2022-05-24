import {useState, useEffect} from 'react'
import Button from "../components/button";
import Nav from "../components/nav";
import SideNav from "../components/sidenav";
import styles from './../styles/home.module.sass'


import { loadNFTs } from '../API/nfts';

export default function Home() {

  const [nfts, setNfts] = useState([1,1,1,1,1,1,1]);

  useEffect(() => {
    getNFTS()
  }, []);

  const getNFTS = async () => {
    setNfts(await loadNFTs())
  }

  

  return (
    <div className={styles.home}>
      <Tip/>
      <FeaturedNFTs nfts={nfts}/>
    </div>
  )
}

const Tip = () => {
  return (
    <div className={styles.tip}>
      <div className={styles.tip_left}>
        <h4>NEWBIE TIP</h4>
        <h1>New to NFTs ?</h1>
        <p>The world’s first secure digital marketplace for crypto NFTs.</p>
        <Button>Learn more</Button>
        <Button>Discover</Button>
      </div>
    </div>
  )
}

const FeaturedNFTs = ({nfts}) => {
  return (
    <div className={styles.featured}>
      <h2>Featured NFTs</h2>
      <div className={styles.nfts}>
        {
          nfts.map(nft => <OneNFT nft={nft}/>)
        }
      </div>
    </div>
  )
}

const OneNFT = ({nft}) => (
  <div className={styles.nft}>
    <img src={nft.image}/>
  </div>
)