import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { NFTModule } from './nfts/nft.module';
import { UsersModule } from './users/users.module';
import { VerificationModule } from './verification/verification.module';

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
    UsersModule,
    NFTModule,
    CategoryModule,
    VerificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
