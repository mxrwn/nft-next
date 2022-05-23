import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ClientsModule.register(
    [{
      name: "USER_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1235
      },
      
    },
    {
      name: "NOTIFICATION_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1234
      }
    }]
  )],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ClientsModule]
})
export class UsersModule {}
