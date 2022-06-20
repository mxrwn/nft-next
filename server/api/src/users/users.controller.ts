import { Body, Controller, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';
import { User } from 'src/dto/users';

const logger = new Logger('USER SERVICE')

@Controller('users')
export class UsersController {
  constructor(
    @Inject("NOTIFICATION_SERVICE") private readonly notification: ClientProxy,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy,
  ) {}

  @Get()
  getUsers(): Observable<any> {
    logger.log('NEW CALL')
    return this.userService.send('get_users', {})
  }

  @Get('/:wallet')
  getUser(@Param('wallet') wallet): Observable<any> {
    logger.log('NEW CALL')
    return this.userService.send('get_user', wallet)
  }

  @Get('/:wallet/activities')
  getActivities(@Param('wallet') wallet): Observable<any> {
    logger.log('NEW CALL')
    return this.userService.send('get_activities', wallet)
  }

  @Post('/:wallet/activities')
  createActivity(@Param('wallet') wallet, @Body() activity: any): Observable<any> {
    logger.log('NEW CALL')
    return this.userService.send('create_activity', {wallet, ...activity})
  }

  @Post()
  createUser(@Body() user: User): Observable<any> {
    logger.log('NEW CALL')
    this.notification.emit('user-created', user)
    return this.userService.send('create_user', user)
  }

  @Get('/notifications')
  getNotifications(): Observable<any> {
    return this.notification.send('notifications', {})
  }
}
