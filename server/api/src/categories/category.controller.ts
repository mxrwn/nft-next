import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';
import { User } from 'src/dto/users';

const logger = new Logger('NFT SERVICE')

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject("NOTIFICATION_SERVICE") private readonly notification: ClientProxy,
    @Inject("CATEGORY_SERVICE") private readonly categoryService: ClientProxy,
  ) {}

  @Get()
  getCategories(): Observable<any> {
    logger.log('NEW CALL')
    return this.categoryService.send('get_categories', {})
  }

  @Get('/:category')
  getNFT(@Param('category') category): Observable<any> {
    logger.log('NEW CALL')
    return this.categoryService.send('get_category', category)
  }

  @Post()
  createCategroy(@Body() data: any): Observable<any> {
    logger.log('NEW CALL')
    // this.notification.emit('nft-created', nft)
    return this.categoryService.send('create_category', data)
  }
}
