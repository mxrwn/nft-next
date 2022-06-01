import Nav from '../components/nav'
import SideNav from '../components/sidenav'
import '../styles/globals.css'
import {useState} from 'react'

function NFTMarketplace({ Component, pageProps }) {

  const [activeDashboard, setactiveDashboard] = useState(true)

  const toggleActive = () => {
    setactiveDashboard(!activeDashboard)
  }

  return (
  <div className={activeDashboard ? 'container active' : 'container'}>
  <SideNav active={activeDashboard}/>
  <Nav toggleActive={toggleActive} activeDashboard={activeDashboard}/>
  <Component {...pageProps}/>
  </div>
  )
}

export default NFTMarketplace
