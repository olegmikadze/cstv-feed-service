import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Videogame } from './videogame.schema';
import { Player } from './player.schema';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ type: String, required: true, nullable: true })
  acronym: string | null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Videogame',
    required: true,
  })
  current_videogame: Videogame;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true, nullable: true })
  image_url: string | null;

  @Prop({ type: String, required: true, nullable: true })
  location: string | null;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Player',
        required: true,
      },
    ],
  })
  players: Player[];

  @Prop({ type: String, required: true, nullable: true })
  slug: string | null;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
