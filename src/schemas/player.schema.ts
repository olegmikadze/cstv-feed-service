import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Team } from './team.schema';

export type IncidentDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ type: Boolean, required: true })
  active: boolean;

  @Prop({ type: Number, required: true, nullable: true })
  age: number | null;

  @Prop({ type: String, required: true, nullable: true })
  birthday: string | null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Team',
    required: true,
    nullable: true,
  })
  current_team: Team | null;

  @Prop({ type: String, required: true, nullable: true })
  first_name: string | null;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true, nullable: true })
  image_url: string | null;

  @Prop({ type: String, required: true, nullable: true })
  last_name: string | null;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, nullable: true })
  nationality: string | null;

  @Prop({ type: String, required: true, nullable: true })
  role: string | null;

  @Prop({ type: String, required: true, nullable: true })
  slug: string | null;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
