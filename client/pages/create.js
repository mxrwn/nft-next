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

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')





const Create = () => {
  const imageInput = useRef()
  const [fileUrl, setFileUrl] = useState(null)
  const [check, setCheck] = useState(false)
  const [resp, setResp] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [formInput, updateFormInput] = useState({price: '', name: '', description: ''})

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
      setFileUrl(url)
    } catch (error) {
      console.log(error)
    }
  }

  async function createItem() {

    const { name, description, price} = formInput
    if(!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    console.log('test')
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      
      createSale(url)
    } catch (error) {
      console.log(error)
    }
  }

  async function createSale(url) {
    console.log('test')
    const web3Modal = new Web3modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    let price = ethers.utils.parseUnits(formInput.price, 'ether')
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    transaction = await contract.createMarketItem(
      nftaddress, tokenId, price
    )
    await transaction.wait()
  }

  const checkNFTFunction = async () => {
    setCheck(true)
    const res = await verify(fileUrl)
    const test = res.filter(nft => nft !== null)
    if(!test[0]){
      setDisabled(false)
    }
    setResp(test)
    
    setTimeout(() => {
      setCheck(false)
    }, 4000);
  }

  return (
    <div className={styles.create}>
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
