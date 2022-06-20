import {useState, useEffect, useRef} from 'react'
import Button from "../components/button";
import Nav from "../components/nav";
import SideNav from "../components/sidenav";
import styles from './../sass/pages/_home.module.sass'
import cards from './../assets/cards.png';
import { useRouter } from 'next/router'

import { loadNFTs } from '../API/nfts';
import LoadingAnimation from '../components/loading';
import { get } from '../API/users';
import * as CategoryService from './../API/categories'
import Link from 'next/link';

export default function Home() {

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getNFTS()
  }, []);

  const getNFTS = async () => {
    const loadedNFTs = await loadNFTs()
    console.log(loadedNFTs)
    if(loadedNFTs){
      setNfts(loadedNFTs ? loadedNFTs : [])
      setTimeout(() => {setLoading(false)}, 4000)
    }
    
    
  }

  

  return (
    <div className={styles.home}>
      {/* <Tip/> */}
      <FeaturedNFTs nfts={nfts}/>
      <Categories/>
      {
        loading ? <LoadingAnimation/> : ''
      }
      <AllNFTs/>
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
      <h1>Featured NFTs</h1>
      <div className={styles.nfts}>
        {
          nfts.map((nft, index) => <OneNFT nft={nft} key={index}/>)
        }
      </div>
      <div>
      </div>
    </div>
  )
}

const OneNFT = ({nft}) => {
  const [user, setUser] = useState({});
  const router = useRouter()
  useEffect(() => {
    async function getUser() {
      if(nft){
        setUser(await get(nft.seller))
      }
      
    }
    getUser()
  }, []);
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
    <div className={styles.info}>
      <h2>{nft.name}</h2>
      <div className={styles.image} style={{background: user.image}}></div>
    </div>
  </div>
)}

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      console.log(await CategoryService.get())
      setCategories(await CategoryService.get())
    }
    getCategories()
    
  }, []);
  return (
    <div className={styles.categories}>
      <h1>Categories</h1>
      <div className={styles.data}>
      {
        categories.map(category => (
          <Link href={`/category/${category.name.toLowerCase()}`} key={category._id}>
          <div className={styles.category} >
            <h2>{category.name}</h2>
          </div>
          </Link>
          
        ))
      }
      </div>
    </div>
  )
}

const AllNFTs = () => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    async function getNFts() {
      const all = await loadNFTs()
      if(all){
        setNfts(await loadNFTs())
      }      
    }
    getNFts()
  }, []);
  return (
    <div className={styles.allnfts}>
      <h1>All NFTs</h1>
      <div className={styles.allnfts_data}>
        {
          nfts.map((nft, index) => (
            <div className={styles.nft} key={index}>
              <div className={styles.image}>
                <img src={nft.image}/>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}