import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';
import { User } from 'src/dto/users';

const logger = new Logger('NFT VERIFICATION SERVICE')

@Controller('verification')
export class VerificationController {
  constructor(
    @Inject("NFT_SERVICE") private readonly NFTService: ClientProxy,
  ) {}
  @Get()
  getVerificationRequests() {
    logger.log('testttttt')
    return this.NFTService.send('verification', {})
  }

  @Get('/:id')
  getVerificationRequest(@Param('id') id) {
    return this.NFTService.send('verification_one', id)
  }

  @Get('/:id/accept')
  acceptVerificationRequest(@Param('id') id) {
    return this.NFTService.send('verification_accept', id)
  }

  @Get('/:id/decline')
  declineVerificationRequest(@Param('id') id) {
    return this.NFTService.send('verification_decline', id)
  }

  @Get('/:id/delete')
  deleteVerificationRequest(@Param('id') id) {
    return this.NFTService.send('verification_delete', id)
  }

  @Post()
  setVerificationRequest(@Body() data) {
    logger.log(data)
    return this.NFTService.send('create_verification', data)
  }
}
