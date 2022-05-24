import Nav from '../components/nav'
import SideNav from '../components/sidenav'
import '../styles/globals.css'

function NFTMarketplace({ Component, pageProps }) {
  return (
  <>
  <SideNav/>
  <Nav/>
  <Component {...pageProps} />
  </>
  )
}

export default NFTMarketplace
