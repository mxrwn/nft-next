import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose';
import { NFT } from 'src/schemas/nft.schema';

@Injectable()
export class NFTService {
  constructor(@Inject('NFT_MODEL') private NFTModel: Model<NFT>){}
  async create(NFT: number) {
    const newNFT = {
      tokenId: NFT,
      likes: 0,
      views: 0
    }
    const createdNFT = new this.NFTModel(newNFT)
    return createdNFT.save()
  }

  async get(NFT: number) {
    try {
      const found = await this.NFTModel.findOne({tokenId: NFT});
      return found
    } catch (error) {
      return {}
    }
  }

  async addView(NFT: number) {
    try {
      const nft = await this.NFTModel.findOneAndUpdate({tokenId: NFT}, { $inc: {views : 1}}, { new: true})
      return nft
    } catch (error) {
      return {}
    }
  }
  async addLike(NFT: number, wallet: string) {
    try {
      const nft = await this.NFTModel.findOneAndUpdate({tokenId: NFT}, { $push: { likes: wallet }}, {new: true})
      return nft
    } catch (error) {
      return {}
    }
  }
}