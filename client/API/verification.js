import { loadNFTs } from "./nfts"

const uri = 'http://localhost:9000/api/v1'

export const verify = async (nft) => {
  const nfts = await loadNFTs()
  const req = await fetch(`${uri}/verify`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify([nft, nfts])
  })
  return await req.json()
}