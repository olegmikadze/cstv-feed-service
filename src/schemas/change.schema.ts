import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChangeDocument = HydratedDocument<Change>;

@Schema()
export class Change {
  @Prop({ required: true })
  change_type: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  type: string;
}

export const ChangeSchema = SchemaFactory.createForClass(Change);
