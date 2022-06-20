import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type VerificationDocument = Verification & Document

@Schema()
export class Verification {
  @Prop({ required: true })
  tokenId: number;

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  accept: boolean = false;

  @Prop()
  fileUrl: string

  @Prop()
  user: string;
}

export const VerificationSChema = SchemaFactory.createForClass(Verification)

