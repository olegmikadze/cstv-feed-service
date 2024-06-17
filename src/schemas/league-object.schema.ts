import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// type SerieDocument = HydratedDocument<Serie>;

@Schema()
class Serie {
  @Prop({ type: String, required: true, nullable: true })
  begin_at: string | null;

  @Prop({ type: String, required: true, nullable: true })
  end_at: string | null;

  @Prop({ type: String, required: true })
  full_name: string;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: true })
  league_id: number;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true, nullable: true })
  name: string | null;

  @Prop({ type: String, required: true, nullable: true })
  season: string | null;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: Number, required: true })
  winner_id: number;

  @Prop({
    type: String,
    enum: ['Player', 'Team'],
    required: true,
    nullable: true,
  })
  winner_type: string | null;

  @Prop({ type: Number, required: true, nullable: true })
  year: number | null;
}

const SerieSchema = SchemaFactory.createForClass(Serie);

export type LeagueObjDocument = HydratedDocument<LeagueObj>;

@Schema()
export class LeagueObj {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  image_url: string | null;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: SerieSchema }] })
  serie: Serie[];

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  url: string | null;

  @Prop(
    raw({
      id: { type: Number },
      name: { type: String },
      slug: { type: String },
      current_version: { type: String, nullable: true },
    }),
  )
  videogame: Record<string, any>;
}

export const LeagueObjSchema = SchemaFactory.createForClass(LeagueObj);
