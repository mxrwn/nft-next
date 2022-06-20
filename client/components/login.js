import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './../sass/components/_login.module.sass'
import metamask from './../assets/icons/MetaMask_Fox.svg.png'
import Image from 'next/image'
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import { useCookies } from 'react-cookie'
import * as userService from './../API/users'
export default function Login() {
  const [accounts, setAccounts, removeAccounts] = useCookies(['users'])
  const RegisterAccount = async () => {
    const web3Modal = new Web3modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // setBalance(parseFloat(ethers.utils.formatEther(await provider.getBalance(await signer.getAddress()))))
    const userCreated = await userService.create(await signer.getAddress())
   
      
        console.log(userCreated)
        setAccounts('users', {...userCreated})
     
  
    
    
  }
  return (
    <div className={styles.blurry}>
      <div className={styles.login}>
      <div className={styles.head}>
        <h2>Connect your wallet</h2>
      </div>
      <div className={styles.body} onClick={() => RegisterAccount()}>
        <Image src={metamask} width={'200px'} height={'200px'}/>
      </div>
    </div>
    </div>
  )
}
