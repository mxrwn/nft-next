import {ethers} from 'ethers';
import axios from 'axios';
import NFT from './../artifacts/contracts/NFT.sol/NFT.json'
import Market from './../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import {
  nftaddress, nftmarketaddress
} from '../config.js'

export async function loadNFTs() {
  console.log('started')
  const provider = new ethers.providers.JsonRpcProvider()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
  const data = await marketContract.fetchMarketItems()
  
  const items = await Promise.all(data.map(async i => {
    const tokenUri = await tokenContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    return {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description
    }
  }))
  if(items.length === 0) return
  console.log(items)
  console.log('ended')
  return items
}