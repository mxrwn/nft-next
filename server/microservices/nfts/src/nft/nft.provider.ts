import { Connection } from "mongoose";
import { NFTSChema } from "src/schemas/nft.schema";

export const NFTProvider = [
  {
    provide: 'NFT_MODEL',
    useFactory: (connection: Connection) => connection.model('NFT', NFTSChema),
    inject: ['DATABASE_CONNECTION']
  }
]