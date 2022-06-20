import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCross, faPlus, faWheatAwnCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef, useEffect} from 'react';
import {create as ipfsHttpClient} from 'ipfs-http-client'
import styles from './../sass/pages/_create.module.sass'
import Button from '../components/button';
import { verify } from '../API/verification';
import { useRouter } from 'next/router'
import { createMarketItem, createNFT, getUserAddress, createBaseNFT, sendToVerification } from '../API/nfts';
import LoadingAnimation from '../components/loading';
import { post } from '../API/activities';
import * as CategoryService from './../API/categories'
import { useCookies } from 'react-cookie';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')





const Create = () => {
  const imageInput = useRef()
  const [fileUrl, setFileUrl] = useState(null)
  const [check, setCheck] = useState(false)
  const [resp, setResp] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [formInput, updateFormInput] = useState({price: '', name: '', category: 'art'})
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useCookies(['users'])
  const router = useRouter()

  useEffect(() => {
    async function getCategories() {
      setCategories(await CategoryService.get())
    }
    getCategories()
  }, []);
  useEffect(() => {
    
    console.log(resp)
  }, [resp]);

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
    
    const { name, price, category} = formInput
    
    if(!name || !price || !fileUrl) return
    const data = JSON.stringify({
      name, image: fileUrl, category: category
    })
    console.log(data)
    
    try {
    
      const added = await client.add(data)
      console.log(added)
      const metadata = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log('test')
      const tokenId = await createNFT(metadata)
      await post(await getUserAddress(), {
        title: `${name} created!`,
        price,
        from: 'you'
      })
      const item = await createMarketItem(tokenId, price);
      console.log(tokenId)
      await createBaseNFT(tokenId)
      setTimeout(() => {setLoading(false)}, 4000)
      router.push(`/nft/${tokenId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const checkNFTFunction = async () => {
    setCheck(true)
    const res = await verify(fileUrl)
    console.log(res)
    setTimeout(() => {
      const test = res.filter(nft => nft !== null)
      console.log(test)
        if(!test[0]){
          console.log('tteeeest')
          setDisabled(false)
        }
        setResp(test)
      setDisabled(false)
    }, 1000);
    
    
    
    
 
      // setCheck(false)
  }
  const askForVerification = async () => {
    const { name, price, category} = formInput
    if(!name || !price || !fileUrl) return
    const data = JSON.stringify({
      name, image: fileUrl, creator: await getUserAddress(), category
    })
    console.log('test')
    try {
      const ver = {
        name,
        price,
        category,
        fileUrl,
        tokenId: resp[0].nft.tokenId,
        user: accounts.users.wallet
      }
      await sendToVerification(ver)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
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
          <h6>Category</h6>
          <select name='category' className={styles.category} onChange={e => updateFormInput({...formInput, category: e.target.value})} value={formInput.category}>
            {
              categories.map(category => (
                <option value={category.name} key={category._id}>{category.name}</option>
              ))
            }
          </select>
          <h6>PRICE</h6>
          <input type='number' placeholder='Asset Price in Matic' onChange={e => updateFormInput({...formInput, price: e.target.value})}/>
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
      </div>
      {
        check && (
          <CheckNFT url={fileUrl} result={resp} setCheck={setCheck} askForVerification={askForVerification}/>
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

const CheckNFT = ({url, result, setCheck, askForVerification}) => {
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
      <div className={styles.close} onClick={() => setCheck(false)}>
        <div className={styles.icon}></div>
      </div>
      <div className={styles.comparator}>
          <img src={url}/>
        </div>
        <div className={styles.comparing}>
        {
          result ?
            result.map((data, index) => (
              <img src={data.nft.image} key={index}/>
            )): ''
        }
        {
          loading && (
            <div className={styles.loading}>
            </div>
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
        {
          result[0] && (
            <div className={styles.human}>
              <Button onClick={() => askForVerification()}>Ask for a human verification</Button>
            </div>
          )
        }
      </div>
  )
}

export default Create;
