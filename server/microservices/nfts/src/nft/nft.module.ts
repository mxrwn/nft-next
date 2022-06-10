import { Module } from "@nestjs/common";
import { DbModule } from "src/db/db.module";
import { NFTController } from "./nft.controller";
import { NFTProvider } from "./nft.provider";
import { NFTService } from "./nft.service";

@Module({
  imports: [DbModule],
  controllers: [NFTController],
  providers: [
    ...NFTProvider,
    NFTService
  ],
  exports: [...NFTProvider]
})

export class NFTModule {}