import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 1234
        }
      },
      {
        name: 'VERIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 1300
        }
      },
      {
        name: 'NFT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 1000
        }
      }
    ]),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
