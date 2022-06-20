import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  wallet: string;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  price: string;

  @Prop()
  from: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);