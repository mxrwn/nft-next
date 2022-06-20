import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NFTDocument = NFT & Document

@Schema()
export class NFT {
  @Prop({ required: true })
  tokenId: number;

  @Prop()
  views: number;

  @Prop()
  categories: number;

  @Prop()
  likes: string[]
}

export const NFTSChema = SchemaFactory.createForClass(NFT)

