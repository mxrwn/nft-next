import { Body, Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import ssim from "ssim.js";
const loadImage = require('./../ex/loadImage.js');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('verify')
  async verify(data): Promise<any> {
    let [nft, nfts] = data;
    if(!nfts || nfts === null) {
      nfts = []
    }
    const promises = await nfts.map(
      async n => {
        const current = loadImage(nft)
        const next = loadImage(n.image)
        const {mssim} = await ssim(await current,await next)
        console.log(mssim)
        if(mssim > 0.50){
          return await {
            test: 'test',
            nft: await n,
            result: await mssim
          }
        } 
      }
    )
    const looks = await Promise.all(promises)
    console.log(await looks)
    return looks
  }
}
