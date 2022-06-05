import React from 'react';
import styles from './../sass/layout/_sidenav.module.sass'
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import * as userService from './../API/users'
import { useCookies } from 'react-cookie';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);



const SideNav = ({active}) => {

  const [user, setUser] = useState({});
  const [accounts, setAccounts, removeAccounts] = useCookies(['users'])

  useEffect(() => {
    // refreshAccounts()
    // ChangedAccounts()
    
  }, [accounts]);
  return (
    <div className={active ? `${styles.sidenav} ${styles.active}` : styles.sidenav}>
      {
        user.image ?
        <UserWallet user={user}/>
        :
        ''
      }
      
      <TotalBalance balance={15}/>
      <Nav/>
      <RecentActivities/>
      <Accounts accounts={accounts} setAccounts={setAccounts} setUser={setUser}/>
    </div>
  );
}

const UserWallet = ({user}) => (
  <div className={styles.wallet}>
    <div className={styles.wallet_icon} style={{background: user.image}}>
    </div>
    <div className={styles.wallet_info}>
      <div className={styles.wallet_name}>
        {user.name}
      </div>
      <div className={styles.wallet_address}>
        {user.wallet}
      </div>
    </div>
  </div>
)

const TotalBalance = ({balance}) => {

  // const total_balance = balance.toFixed(2)

  return (
    <div className={styles.balance}>
      <div className={styles.balance_head}>
        <h5>Your Balance</h5>
        <div className={styles.balance_price}>
          <h2 className={styles.price}>{balance.toFixed(3)}</h2>
          <div className={styles.currency}>
            <FontAwesomeIcon icon={faEthereum} />
            <h5>ETH</h5>
          </div>
          
        </div>
      </div>
      <Graph/>
    </div>
  )
}

const Graph = () => {
  const labels = ['January', 'February', 'March', 'April'];
  const [chart, setChart] = useState({
    labels,
    datasets: [{
      data: [451,1687,342,1048],
      borderColor: '#FF58BC',
      tension: 0.5
    }
    ]
  })

  const [options, setOptions] = useState({
      responsive: true,
      legend: {
        display: false
      },
      
      scales: {
        x: {
          grid: {
            display: false,
          },
          gridLines: { color: "#131c2b" },
          ticks: {
            display: false
          },
          gridLines: {
            display: false,
          },
          
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
      },
  })

  return (
    <div className={styles.graph}>
      <Line options={options} data={chart}/>
    </div>
  )
}

const Nav = () => {
  return (
    <div className={styles.nav}>
      <h6>LINKS</h6>
       
      <Link href='/create'>
      <div className={styles.link}>
      <FontAwesomeIcon icon={faHeart}/>
          <a>Create</a>
        </div>
      </Link>
      <Link href='/following'>
      <div className={styles.link}>
      <FontAwesomeIcon icon={faHeart}/>
          <a>Following</a>
        </div>
      </Link>
      <Link href='/favourites'>
      <div className={styles.link}>
      <FontAwesomeIcon icon={faHeart}/>
          <a>Favourites</a>
        </div>
      </Link>
    </div>
  )
}

const RecentActivities = () => {

  const [activities, setActivities] = useState([{
    id: 0,
    type: 'transaction',
    from: {
      id: 14,
      name: 'Jhon Doe',
    },
    to: {
      id: 10,
      name: 'Maria Sea',
    },
    content: {
      id: 14,
      name: 'Burger Flipper 5440',
      image: '',
      price: 0.14
    }
  }, {
    id: 0,
    type: 'transaction',
    from: {
      id: 14,
      name: 'Jhon Doe',
    },
    to: {
      id: 10,
      name: 'Maria Sea',
    },
    content: {
      id: 14,
      name: 'Burger Flipper 5440',
      image: '',
      price: 0.14
    }
  },{
    id: 0,
    type: 'transaction',
    from: {
      id: 14,
      name: 'Jhon Doe',
    },
    to: {
      id: 10,
      name: 'Maria Sea',
    },
    content: {
      id: 14,
      name: 'Burger Flipper 5440',
      image: '',
      price: 0.14
    }
  }]);

  return (
    <div className={styles.recent_activities}>
      <h6>RECENT ACTIVITIES</h6>
      {
        activities.map((activity, index) => (
          <>
            <Activity data={activity} key={index}/>
          </>
        )     
        )
      }
      
    </div>
  )
}

const Activity = ({data}) => {
  return (
    <div className={styles.activity}>
      <div className={styles.activity_image}>
        <img src={data.content.image}/>
      </div>
      <div className={styles.activity_nft}>
        <h3>{data.content.name}</h3>
        <h5>From {data.from.name}</h5>
      </div>
      <div className={styles.activity_price}>
        <h5>{data.content.price} ETH</h5>
      </div>
    </div>
  )
}

const Accounts = ({accounts, setAccounts}) => {
  const RegisterAccount = async () => {
    const web3Modal = new Web3modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // setBalance(parseFloat(ethers.utils.formatEther(await provider.getBalance(await signer.getAddress()))))
    const userCreated = await userService.create(await signer.getAddress())
    let users = JSON.parse(sessionStorage.getItem('accounts'));
    if(users === null){
      users = []
    }
    
    const find = users.find(user => user.wallet === userCreated.wallet);
    if(!find){
      setAccounts([...accounts, userCreated])
      sessionStorage.setItem('accounts', JSON.stringify([...accounts, userCreated]))
    }
    
  }

  const activeAccount = async (acc) => {
    const web3Modal = new Web3modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    setBalance(parseFloat(ethers.utils.formatEther(await provider.getBalance(acc.wallet))))
    setWallet(acc.wallet)
    let tmp = accounts.map(account => {
      if(account.wallet === acc.wallet){
        account.active = true;
      }else{
        account.active = false;
      }
      return account
    })
    setAccounts(tmp)
  }

  return (
    <div className={styles.accounts}>
      {
        accounts[0] && (
          accounts.map((account, index) => (
            <AccountIcon data={account} key={index} onClick={() => activeAccount(account)}/>
          ))
        )
      }
      <div className={styles.add_account} onClick={() => RegisterAccount()}>
        <FontAwesomeIcon icon={faPlus}/>
      </div>
    </div>
  )
}

const AccountIcon = ({data, onClick}) => {
  return (
    <div className={data.active ? styles.account_icon_active : styles.account_icon} style={{background: data.image}}
      onClick={onClick}>
      <img className={styles.account_icon_image}></img>
    </div>
  )
}
export default SideNav;
