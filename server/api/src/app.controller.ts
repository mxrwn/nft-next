import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { User } from './dto/users';

const logger = new Logger('MAIN')

@Controller()
export class AppController {
  constructor(
    @Inject("NOTIFICATION_SERVICE") private readonly notification: ClientProxy,
    @Inject("VERIFICATION_SERVICE") private readonly verification: ClientProxy,
  ) {}

  @Get()
  getUsers(): Boolean {
    return true;
  }

  @Get('/notifications')
  getNotifications(): Observable<any> {
    return this.notification.send('notifications', {})
  }

  @Post('/verify')
  verify(@Body() data) : Observable<any> {
    return this.verification.send('verify', data)
  } 
}
