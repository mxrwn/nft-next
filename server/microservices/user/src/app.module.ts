import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [UsersModule, DbModule],
  controllers: [UserController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {
  constructor() {
    console.log('test')
  }
}
