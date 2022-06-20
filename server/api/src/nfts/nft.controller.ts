import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';
import { User } from 'src/dto/users';

const logger = new Logger('NFT SERVICE')

@Controller('nft')
export class NFTController {
  constructor(
    @Inject("NOTIFICATION_SERVICE") private readonly notification: ClientProxy,
    @Inject("NFT_SERVICE") private readonly NFTService: ClientProxy,
  ) {}

  @Get('/:nft')
  getNFT(@Param('nft') nft): Observable<any> {
    logger.log(nft)
    return this.NFTService.send('get_nft', nft)
  }

  @Post('/:token')
  createNFT(@Param('token') nft): Observable<any> {
    logger.log('NEW CALLLLLL')
    // this.notification.emit('nft-created', nft)
    return this.NFTService.send('create_nft', parseInt(nft))
  }

  @Post('/:nft/views')
  addView(@Param('nft') nft) {
    return this.NFTService.send('add_view', nft)
  }

  @Post('/:nft/likes/:wallet')
  addLike(@Param('nft') nft, @Param('wallet') wallet) {
    return this.NFTService.send('add_like', {tokenId: nft, wallet})
  }
  @Delete('/:nft/likes/:wallet')
  removeLike(@Param('nft') nft, @Param('wallet') wallet) {
    return this.NFTService.send('remove_like', {tokenId: nft, wallet})
  }

  @Get('/:category')
  getByCategory(@Param('category') category) {
    return this.NFTService.send('by_category', category)
  }
  @Get('/verification')
  getVerificationRequests() {
    logger.log('testttttt')
    return this.NFTService.send('verification', {})
  }

  @Get('/verification/:id')
  getVerificationRequest(@Param('id') id) {
    return this.NFTService.send('verification_one', {})
  }

  @Post('/verification')
  setVerificationRequest(@Body() data) {
    logger.log(data)
    return this.NFTService.send('create_verification', data)
  }
}
