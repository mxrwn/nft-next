import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { NFTService } from "./nft.service";

@Controller('nft')
export class NFTController {
  constructor(private readonly nftService: NFTService) {}
  @MessagePattern('create_nft')
  async createNFT(data: number) : Promise<any> {
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
    return this.nftService.addLike(data.tokenId, data.wallet)
  }
}