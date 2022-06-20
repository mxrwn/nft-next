import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { NFTService } from "./nft.service";

const logger = new Logger('NFT CONTROLLER')
@Controller('nft')
export class NFTController {
  constructor(private readonly nftService: NFTService) {}
  @MessagePattern('create_nft')
  async createNFT(data: number) : Promise<any> {
    logger.log(data)
    return this.nftService.create(data)
  }
  @MessagePattern('get_nft')
  async getNFT(data: number) : Promise<any> {
    return this.nftService.get(data)
  }
  @MessagePattern('add_view')
  async addView(data: number) : Promise<any> {
    return this.nftService.addView(data)
  }
  @MessagePattern('add_like')
  async addLike(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.addLike(data.tokenId, data.wallet)
  }
  @MessagePattern('remove_like')
  async removeLike(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.removeLike(data.tokenId, data.wallet)
  }
  @MessagePattern('by_category')
  async getByCategory(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.getByCategory(data)
  }
  @MessagePattern('verification')
  async getVerification() : Promise<any> {
    return this.nftService.verificationRequests()
  }

  @MessagePattern('verification_one')
  async getOneVerification(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.verificationRequest(data)
  }

  @MessagePattern('create_verification')
  async createVerification(data: any) : Promise<any> {
    logger.log('test')
    return this.nftService.createVerification(data)
  }

  @MessagePattern('verification_accept')
  async acceptVerification(id) : Promise<any> {
    return this.nftService.acceptVerificationRequest(id)
  }

  @MessagePattern('verification_decline')
  async declineVerification(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.declineVerificationRequest(data)
  }

  @MessagePattern('verification_delete')
  async deleteVerification(data: any) : Promise<any> {
    logger.log(data)
    return this.nftService.deleteVerificationRequest(data)
  }

  @MessagePattern('featured')
  async featured() : Promise<any> {
    
  }
  
}