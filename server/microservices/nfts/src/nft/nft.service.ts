import { Inject, Injectable, Logger } from '@nestjs/common'
import { Model } from 'mongoose';
import { NFT } from 'src/schemas/nft.schema';
import { Verification } from 'src/schemas/verification.schema';

const logger = new Logger('NFT SERVICE')
@Injectable()
export class NFTService {
  constructor(@Inject('NFT_MODEL') private NFTModel: Model<NFT>,
  @Inject('VERIFICATION_MODEL') private VerificationModel: Model<Verification>){}
  async create(NFT: number) {
    const newNFT = {
      tokenId: NFT,
      likes: [],
      views: 0
    }
    const createdNFT = new this.NFTModel(newNFT)
    logger.log(createdNFT);
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

  async getByCategory(category: string) {
    try {
      const found = await this.NFTModel.find({category});
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
  async removeLike(NFT: number, wallet: string) {
    try {
      const nft = await this.NFTModel.findOneAndUpdate({tokenId: NFT}, { $pull: { likes: wallet }}, {new: true})
      return nft
    } catch (error) {
      return {}
    }
  }

  async getFeatured() {
    try {
      const nfts = await this.NFTModel.find().exec();
      return nfts.sort((a, b) => {
        return a.views - b.views
      })
    } catch (error) {
      return []
    }
  }

  async createVerification(data) {
    console.log('testtttt', data)
    try {
      
    const createdNFT = new this.VerificationModel(data)
    logger.log(createdNFT);
    return createdNFT.save()
    } catch (error) {
      
    }
  }

  async verificationRequests() {
    try {
    const NFTs = this.VerificationModel.find().exec()
    logger.log(NFTs);
    return NFTs
    } catch (error) {
      
    }
  }
  async verificationRequest(id) {
    try {
    const NFTs = this.VerificationModel.findOne({_id: id})
    logger.log(NFTs);
    return NFTs
    } catch (error) {
      
    }
  }
  async acceptVerificationRequest(id) {
    try {
    const NFTs = this.VerificationModel.findOneAndUpdate({_id: id}, {accept: true})
    logger.log(NFTs);
    return NFTs
    } catch (error) {
      
    }
  }
  async declineVerificationRequest(id) {
    try {
    const NFTs = this.VerificationModel.findOneAndUpdate({_id: id}, {accept: false})
    return NFTs
    return NFTs
    } catch (error) {
      
    }
  }

  async deleteVerificationRequest(id) {
    logger.log('this is a delete', id)
    try{
      const NFTs = this.VerificationModel.findOneAndDelete({_id: id}).exec()
      return NFTs
    }catch(error){

    }
  }
}