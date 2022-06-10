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

export async function getNFT(id) {
  const provider = new ethers.providers.JsonRpcProvider()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  const signer = provider.getSigner()
  try {
    const tokenUri = await tokenContract.tokenURI(id)
    const meta = await axios.get(tokenUri)
    let owner = await tokenContract.ownerOf(id)
    if(owner === await signer.getAddress()){
      owner = 'you'
    }
    console.log(tokenContract, await tokenContract.ownerOf(id))
    return {...meta.data, owner}
  } catch (error) {
    console.log(error)
  }
}

export async function isOnMarket(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const item = await marketContract.getMarketItem(id)
    console.log(item)
    const tokenUri = await tokenContract.tokenURI(item.tokenId.toNumber())
    const meta = await axios.get(tokenUri)  
    let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
  
    if(item.tokenId.toNumber() !== parseInt(id)) return false
    return {
      price,
      tokenId: item.tokenId.toNumber(),
      seller: item.seller,
      owner: item.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description
    }
  } catch (error) {
    console.log(error)
  }
}

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

export async function createSale(id, price) {
  console.log(price)
  price = ethers.utils.parseUnits(price.toString(), 'ether')
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  console.log(nftaddress, id, price)
  let transaction = await contract.createMarketSale(nftaddress, id, {value: price})
  let tx = await transaction.wait()
  console.log(tx)
  

  
}

export async function getUserAddress() {
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  return await signer.getAddress()
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
  console.log(tokenId)
  return tokenId
}

export async function createMarketItem(tokenId, inputPrice) {
  let price = ethers.utils.parseUnits(inputPrice, 'ether')
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  console.log(contract)
  let transaction = await contract.createMarketItem(
    nftaddress, tokenId, price
  )
  await transaction.wait()
}

async function createBaseNFT(nft) {
  try {
    let response = await fetch(`${uri}/nft`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(nft)
    })
    return response.json()
  } catch (error) {
    return {}
  }
  
}

async function getViews(id) {
  try {
    const response = await fetch(`${uri}/views/${id}`)
    return response.json()
  } catch (error) {
    return false
  }
}

async function getLikes(id) {
  try {
    const response = await fetch(`${uri}/likes/${id}`)
    return response.json()
  } catch (error) {
    return false
  }
}