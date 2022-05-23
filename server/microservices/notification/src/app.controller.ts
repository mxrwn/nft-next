import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './dto/users';

const logger = new Logger('Notification')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @MessagePattern('notifications')
  async getNotifications(): Promise<any> {
    return this.appService.getNotifications()
  }

  @EventPattern('user-created')
  async handleUserCreated(data : User) {
    logger.log('New user created ' + data.wallet)
    this.appService.log(data);
  }
}
