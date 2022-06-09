import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCross, faPlus, faWheatAwnCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef, useEffect} from 'react';
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client'
import NFT from './../artifacts/contracts/NFT.sol/NFT.json'
import Market from './../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import {
  nftaddress, nftmarketaddress
} from '../config.js'
import styles from './../sass/pages/_create.module.sass'
import Button from '../components/button';
import { verify } from '../API/verification';
import { useRouter } from 'next/router'
import { createMarketItem, createNFT, getUserAddress, saveNFT } from '../API/nfts';
import LoadingAnimation from '../components/loading';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')





const Create = () => {
  const imageInput = useRef()
  const [fileUrl, setFileUrl] = useState(null)
  const [check, setCheck] = useState(false)
  const [resp, setResp] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [formInput, updateFormInput] = useState({price: '', name: '', description: ''})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onChange = async (e) => {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      setFileUrl(url)
    } catch (error) {
      console.log(error)
    }
  }

  async function createItem() {
    setLoading(true)
    const { name, description, price} = formInput
    if(!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({
      name, description, image: fileUrl, category: 'art', creator: await getUserAddress()
    })
    console.log('test')
    try {
      const added = await client.add(data)
      const metadata = `https://ipfs.infura.io/ipfs/${added.path}`
      
      const tokenId = await createNFT(metadata)
      const item = await createMarketItem(tokenId, price);
      console.log(tokenId)
      setTimeout(() => {setLoading(false)}, 4000)
      router.push(`/nft/${tokenId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const checkNFTFunction = async () => {
    setCheck(true)
    const res = await verify(fileUrl)
    if(res[0]) {
      console.log('cacaacaaa')
      const test = res.filter(nft => nft !== null)
      if(!test[0]){
        console.log('tteeeest')
        setDisabled(false)
      }
      setResp(test)
    }
    setDisabled(false)
    
    
    
    setTimeout(() => {
      setCheck(false)
    }, 4000);
  }

  return (
    <div className={styles.create}>
      {
        loading ? <LoadingAnimation/> : ''
      }
      <div className={styles.form}>
        <div className={styles.form_left} onClick={() => console.log(imageInput.current.click())}>
          <div className={styles.preview_image}>
          {
          fileUrl && (
            <img src={fileUrl}/>
          )
        }
          </div>
          <input type='file' placeholder='Asset' onChange={onChange} ref={imageInput}/>
        </div>
        <div className={styles.form_right}>
          <div className={styles.inputs}>
          <h6>NAME</h6>
          <input type='text' placeholder='Asset Name' onChange={e => updateFormInput({...formInput, name: e.target.value})}/>
          <h6>DESCRIPTION</h6>
          <textarea type='text' placeholder='Asset Description' onChange={e => updateFormInput({...formInput, description: e.target.value})}/>
          <h6>PRICE</h6>
          <input type='number' placeholder='Asset Price in Matic' onChange={e => updateFormInput({...formInput, price: e.target.value})}/>
          </div>
          <div className={styles.buttons}>
          <Button onClick={() => checkNFTFunction()}>
            Check NFT
          </Button>
          <Button onClick={createItem} disabled={disabled}>
          Create
        </Button>
          </div>
        </div>
      </div>
      {
        check && (
          <CheckNFT url={fileUrl} result={resp}/>
        )
          
      }
    </div>
  );
}

const CreateIcon = () => {
  return (
    <div className='create-icon'>
      <FontAwesomeIcon icon={faPlus}/>
    </div>
  )
}

const CheckNFT = ({url, result}) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(result)
    if(result[0]) {
      setLoading(false)
    }
    setTimeout(() => {
      setLoading(false)
    }, 3000);
    
  }, [result]);
  return (
    <div className={styles.checkNFT}>
      <div className={styles.checking}>
        <img src={url}/>
        {
          result ?
            result.map(data => (
              <img src={data.nft.image}/>
            )): ''
        }
        {
          loading && (
            <div className={styles.loading}/>
          )
        }
        {
          result[0] && !loading && (
            <div className={styles.error}>
              <FontAwesomeIcon icon={faXmark}/>
            </div>
        )}
        {
          !result[0] && !loading && (
            <div className={styles.approved}>
              <FontAwesomeIcon icon={faCheck}/>
            </div>
          )}
            
        
      </div>
      
    </div>
  )
}

export default Create;
