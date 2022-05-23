import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DbModule } from 'src/db/db.module';
import { UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UserProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [
    ...UserProvider,
    UsersService
  ],
  exports: [...UserProvider]
})
export class UsersModule {}
