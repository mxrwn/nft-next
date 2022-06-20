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
    return {...meta.data, owner}
  } catch (error) {
    console.log(error)
  }
}

export async function fetchCreatedItems(){
  const provider = new ethers.providers.JsonRpcProvider()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
  const data = await marketContract.getAllMarketItems()
  console.log(data)
  const tokenids = await tokenContract._tokenIds()
  const ids = tokenids.toNumber()

  console.log('test')
  const items = await Promise.all(
    arr.map(async (i, index) => {
    const itemonmarket = await isOnMarket(index)
    console.log(itemonmarket)
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
  return items
}

export async function getMyNFTs() {
  const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const items = await marketContract.fetchMyNFTs()
    console.log(items)
}

export async function isOnMarket(id) {
  try {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const item = await marketContract.getMarketItem(id)
    console.log(item)
    const tokenUri = await tokenContract.tokenURI(item.tokenId.toNumber())
    console.log(tokenUri)
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
  const provider = new ethers.providers.JsonRpcProvider()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
  const data = await marketContract.fetchMarketItems()
  let array = [...data];
  const tokens = await tokenContract._tokenIds();
  const ids = tokens.toNumber()
  const arr = new Array(ids)
  console.log(arr)
  for (let index = 0; index < arr.length; index++) {
    const itemonmarket = await isOnMarket(index)
    if(!itemonmarket) {
      array.push({tokenId: index + 1})
    }
    console.log(array)
  }
  
  const items = await Promise.all(array.map(async i => {
    const tokenUri = await tokenContract.tokenURI(i.tokenId)
    const owner = await tokenContract.ownerOf(i.tokenId)
    console.log(owner)
    
    const meta = await axios.get(tokenUri)
    return {
      tokenId: typeof i.tokenId === 'number' ? i.tokenId : i.tokenId.toNumber(),
      seller: i.seller ? i.seller : owner,
      owner: i.owner ? i.owner : owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description
    }
  }))
  if(items.length === 0) return
  return items
}

export async function createSale(id, price) {
  price = ethers.utils.parseUnits(price.toString(), 'ether')
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  let transaction = await contract.createMarketSale(nftaddress, id, {value: price})
  let tx = await transaction.wait()
  
}

export async function getUserAddress() {
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  return await signer.getAddress()
}

export async function getUserBalance() {
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  let balance = await signer.getBalance()
  balance = ethers.utils.formatEther(balance)
  console.log(balance)
  return parseFloat(balance)
}

export async function createNFT(metadata) {
  console.log(metadata)
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

export async function createMarketItem(tokenId, inputPrice) {
  let price = ethers.utils.parseUnits(inputPrice, 'ether')
  console.log(price)
  const web3Modal = new Web3modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  console.log(contract)
  let transaction = await contract.createMarketItem(
    nftaddress, tokenId, price
  )
  console.log(transaction)
  await transaction.wait()
}

export async function createBaseNFT(nft) {
  try {
    let response = await fetch(`${uri}/nft/${nft}`, {
      method: 'POST'
    })
    return response.json()
  } catch (error) {
    return {}
  }
}

export async function getBaseNFT(id) {
  try {
    const response = await fetch(`${uri}/nft/${id}`)
    return response.json()
  } catch (error) {
    return false
  }
}

export async function getByCategory(name) {
  const provider = new ethers.providers.JsonRpcProvider()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  const t = await tokenContract._tokenIds();
  try {
    const tokens = Array.apply(null, Array(t.toNumber())).map(function (x, i) { return i + 1; });
    console.log(tokens)
      
    const promiseNFTs = await Promise.all(
      tokens.map(async token => {
        console.log(token)
        const nft = await getNFT(token)
        const onMarket = await isOnMarket(token)
        return {...nft, ...onMarket}
      })
    )
    console.log(promiseNFTs)
    let response = promiseNFTs
    console.log(response, 'test')
    let promise = 
    new Promise(resolve => {
    const allNfts = [];
    response.map(async nft => {
      const tokenUri = await tokenContract.tokenURI(nft.tokenId)
      const meta = await axios.get(tokenUri)
      console.log(name)
      console.log(meta.data.category.toLowerCase() === name.toLowerCase())
      if(meta.data.category.toLowerCase() === name.toLowerCase()) {
        allNfts.push(nft)
      }
      console.log(allNfts)
      resolve(allNfts)
    })
  })
   
    return await promise
    
  } catch (error) {
    return []
  }
}



export async function addView(id) {
  try {
    const response = await fetch(`${uri}/nft/${id}/views`, {
      method: 'POST'
    })
    return response.json()
  } catch (error) {
    return false
  }
}
export async function addLike(id) {
  try {
    const response = await fetch(`${uri}/nft/${id}/likes/${await getUserAddress()}`, {
      method: 'POST',
    })
    return response.json()
  } catch (error) {
    return false
  }
}

export async function removeLike(id) {
  try {
    const response = await fetch(`${uri}/nft/${id}/likes/${await getUserAddress()}`, {
      method: 'DELETE'
    })
    return response.json()
  } catch (error) {
    return false
  }
}

export async function sendToVerification(nft) {
  try {
    const response = await fetch(`${uri}/verification`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(nft)
    })
    const data = response.json()
    console.log(data)
    return data
  } catch (error) {
    return {}
  }
}

export const getVerificationRequests = async () => {
  try {
    const response = await fetch(`${uri}/verification`)
    const data = response.json()
    console.log(data)
    return data
  } catch (error) {
    return []
  }
} 

export const getVerificationRequest = async (id) => {
  try {
    const response = await fetch(`${uri}/verification/${id}`)
    return await response.json();
  } catch (error) {
    return {}
  }
}

export const acceptVerification = async (id) => {
  try {
    const response = await fetch(`${uri}/verification/${id}/accept`)
    return await response.json();
  } catch (error) {
    return {}
  }
}

export const deleteVerification = async (id) => {
  try {
    const response = await fetch(`${uri}/verification/${id}/delete`)
    return await response.json();
  } catch (error) {
    return {}
  }
}

export const declineVerification = async (id) => {
  try {
    const response = await fetch(`${uri}/verification/${id}/decline`)
    return await response.json();
  } catch (error) {
    return {}
  }}