import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Videogame } from './videogame.schema';
import { Tournament } from './tournament.schema';
import { League } from './league.schema';

export type SerieDocument = HydratedDocument<Serie>;

@Schema()
export class Serie {
  @Prop({ type: String, required: true })
  begin_at: string | null;

  @Prop({ type: String, required: true })
  end_at: string | null;

  @Prop({ type: String, required: true })
  full_name: string;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'League',
    required: true,
  })
  league: League;

  @Prop({ type: Number, required: true })
  league_id: number;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, nullable: true })
  season: string | null;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
      },
    ],
  })
  tournaments: Tournament[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Videogame',
    required: true,
  })
  videogame: Videogame;

  @Prop({
    type: {
      id: Number,
      name: String,
      slug: String,
      videogame_id: Number,
    },
    required: true,
  })
  videogame_title: {
    id: number;
    name: string;
    slug: string;
    videogame_id: number; //1 3 4 14 20 22 23 24 25 26 27 28 29 30 31 32 33 34
  };

  @Prop({ type: Number, required: true })
  winner_id: number;

  @Prop({ type: String, required: true, nullable: true })
  winner_type: string | null;

  @Prop({ type: Number, required: true, nullable: true })
  year: number | null; // >= 2012
}

export const SerieSchema = SchemaFactory.createForClass(Serie);
