import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NFTModule } from './nft/nft.module';

@Module({
  imports: [NFTModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
