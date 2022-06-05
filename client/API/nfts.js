import {ethers} from 'ethers';
import axios from 'axios';
import NFT from './../artifacts/contracts/NFT.sol/NFT.json'
import Market from './../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import {
  nftaddress, nftmarketaddress
} from '../config.js'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import Web3modal from 'web3modal';

const uri = 'http://localhost:9000/api/v1'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

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

async function createSale(url) {
  console.log('test')
  

  
}

export async function createNFT(metadata) {
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()

  let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
  let transaction = await contract.createToken(metadata)
  let tx = await transaction.wait()
  let event = tx.events[0]
  let value = event.args[2]
  let tokenId = value.toNumber()
  return tokenId
}

async function createMarketItem(tokenId, inputPrice) {
  let price = ethers.utils.parseUnits(inputPrice, 'ether')
  let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  let transaction = await contract.createMarketItem(
    nftaddress, tokenId, price
  )
  await transaction.wait()
}