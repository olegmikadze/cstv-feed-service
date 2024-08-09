import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeletionIncidentDocument = HydratedDocument<DeletionIncident>;

@Schema()
export class DeletionIncident {
  @Prop({ type: String, required: true })
  deleted_at: string;

  @Prop({ type: String, required: true })
  reason: string;

  @Prop({ type: Number, required: true })
  videogame_id: number;
}

export const DeletionIncidentSchema =
  SchemaFactory.createForClass(DeletionIncident);
