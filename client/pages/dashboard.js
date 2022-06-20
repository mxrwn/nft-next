import Link from 'next/link';
import React, { useState, createRef, useEffect } from 'react'
import { getVerificationRequests } from '../API/nfts';
import Button from '../components/button';
import styles from './../sass/pages/_dashboard.module.sass'

export default function Dashboard() {
  const [password, setPassword] = useState('admin');
  const [input, setInput] = useState('')
  const [nfts, setNfts] = useState([])
  useEffect(() => {
    async function getNFTs() {
      let NFTS = await getVerificationRequests()
      NFTS = NFTS.filter(Nfts => !Nfts.accept);
      setNfts(NFTS)
    }
    getNFTs()
  }, []);
  if(password !== input) {
    console.log(styles)
    return (<PasswordManager setInput={setInput} password={password}/>)
  }
  return (
    <div className={styles.dashboard}>
      <h1>Human verification requests</h1>
      <div className={styles.nfts}>
        {
          nfts[0] ? 
            nfts.map((nft, i) => (
              <Link href={`/dashboard/${nft._id}`} key={nft._id}>
                <img src={nft.fileUrl}/>
              </Link>
            ))
            :
            <h2>Nothing to check here...</h2>
        }
      </div>
    </div>
  )
}


function PasswordManager({setInput, password}) {
  const inputElement = createRef();
  const handlePassword = () => {
    if(inputElement.current.value === password) {
      setInput(inputElement.current.value)
    }
  }
  return (
    <div className={styles.password}>
      <input type={'text'} placeholder='Password...' ref={inputElement}/>
      <Button onClick={() => handlePassword()}>Enter</Button>
    </div>
  )
}
