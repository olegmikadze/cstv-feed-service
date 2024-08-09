import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Serie } from './serie.schema';
import { Videogame } from './videogame.schema';

export type LeagueDocument = HydratedDocument<League>;

@Schema()
export class League {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true, nullable: true })
  image_url: string | null;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'Serie', required: true },
    ],
    required: true,
  })
  series: Serie[];

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Videogame',
    required: true,
  })
  videogame: Videogame;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
