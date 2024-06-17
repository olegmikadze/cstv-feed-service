import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MatchObjDocument = HydratedDocument<MatchObj>;

@Schema()
export class MatchObj {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true })
  begin_at: string | null;

  @Prop({ type: String, required: true })
  end_at: string | null;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String })
  modified_at: string;
}

export const MatchObjSchema = SchemaFactory.createForClass(MatchObj);
