import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

@Module({
  imports: [ClientsModule.register(
    [{
      name: "NFT_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1000
      },
      
    }]
  )],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [ClientsModule]
})
export class VerificationModule {}
