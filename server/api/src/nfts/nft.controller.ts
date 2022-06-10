import { Body, Controller, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
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
    logger.log('NEW CALL')
    return this.NFTService.send('get_nft', nft)
  }

  @Post()
  createNFT(@Body() nft: any): Observable<any> {
    logger.log('NEW CALL')
    this.notification.emit('nft-created', nft)
    return this.NFTService.send('create_nft', nft)
  }
}
