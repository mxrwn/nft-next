import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NFTController } from './nft.controller';
import { NFTService } from './nft.service';

@Module({
  imports: [ClientsModule.register(
    [{
      name: "NFT_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1000
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
  controllers: [NFTController],
  providers: [NFTService],
  exports: [ClientsModule]
})
export class NFTModule {}
