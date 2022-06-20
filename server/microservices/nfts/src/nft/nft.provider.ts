import { Connection } from "mongoose";
import { NFTSChema } from "src/schemas/nft.schema";
import { VerificationSChema } from "src/schemas/verification.schema";

export const NFTProvider = [
  {
    provide: 'NFT_MODEL',
    useFactory: (connection: Connection) => connection.model('NFT', NFTSChema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'VERIFICATION_MODEL',
    useFactory: (connection: Connection) => connection.model('Verification', VerificationSChema),
    inject: ['DATABASE_CONNECTION']
  }
]