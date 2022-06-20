import Nav from '../components/nav'
import SideNav from '../components/sidenav'
import {useState} from 'react'
import './../sass/style.sass'
import Header from '../components/header'
import Head from 'next/head'
import Login from '../components/login'
import { useCookies } from 'react-cookie'

function NFTMarketplace({ Component, pageProps }) {

  const [activeDashboard, setactiveDashboard] = useState(true)
  const [darkmode, setDarkmode] = useState(false)
  const [accounts] = useCookies(['users'])

  const toggleActive = () => {
    setactiveDashboard(!activeDashboard)
  }

  const toggleTheme = () => {
    setDarkmode(!darkmode)
  }

  return (
    
    <div className={'theme ' + (darkmode ? 'theme--dark' : 'theme--light')}>
      <div className='content'>
        {
          !accounts.users ? <Login/> : ''
        }
        <div className={activeDashboard ? 'container active' : 'container'}>
          <Header darkmode={darkmode} toggleTheme={toggleTheme}/>
          <SideNav active={activeDashboard}/>
          <Nav toggleActive={toggleActive} activeDashboard={activeDashboard}/>
          <Component {...pageProps}/>
        </div>
      </div>
    </div>
  )
}

export default NFTMarketplace
