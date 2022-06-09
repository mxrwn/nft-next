import {useState, useEffect, useRef} from 'react'
import Button from "../components/button";
import Nav from "../components/nav";
import SideNav from "../components/sidenav";
import styles from './../sass/pages/_home.module.sass'
import cards from './../assets/cards.png';
import { useRouter } from 'next/router'

import { loadNFTs } from '../API/nfts';
import LoadingAnimation from '../components/loading';

export default function Home() {

  const [nfts, setNfts] = useState([1,1,1,1,1,1,1]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getNFTS()
  }, []);

  const getNFTS = async () => {
    setLoading(true)
    const loadedNFTs = await loadNFTs()
    setNfts(loadedNFTs ? loadedNFTs : [])
    setTimeout(() => {setLoading(false)}, 4000)
    
  }

  

  return (
    <div className={styles.home}>
      {/* <Tip/> */}
      <FeaturedNFTs nfts={nfts}/>
      {
        loading ? <LoadingAnimation/> : ''
      }
      
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
  const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0});
  const featured = useRef(null);

  const mouseDownHandler = e => () => {
    setPos({
      left: featured.current.scrollLeft,
      top: featured.current.scrollTop,
      x: e.clientX,
      y: e.clientY
    })

    console.log('test')
    featured.current.userSelect = 'none'
  }

  const mouseMoveHandler = e => () => {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y

    featured.current.scrollTop = pos.top - dy
    featured.current.scrollLeft = pos.left - dx
  }

  const mouseUpHandler = e => () => {
    console.log('test')
    featured.current.removeProperty('user-select')
  }

  return (
    <div className={styles.featured}>
      <h2>Featured NFTs</h2>
      <div className={styles.nfts} ref={featured}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onClick={(e) => mouseDownHandler(e)}
      >
        {
          nfts.map(nft => <OneNFT nft={nft}/>)
        }
      </div>
    </div>
  )
}

const OneNFT = ({nft}) => {
  const router = useRouter()

  const SendToNFT = () => {
    router.push(`/nft/${nft.tokenId}`)
  }
  return (
  <div className={styles.nft} onClick={() => SendToNFT()}>
    {
      nft.image && (
        <img src={nft.image}/>
      )
    }
  </div>
)}