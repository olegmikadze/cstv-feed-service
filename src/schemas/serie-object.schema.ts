import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
class Tournament {
  @Prop({ type: String, required: true, nullable: true })
  begin_at: string | null;

  @Prop({ type: Boolean, required: true })
  detailed_stats: boolean;

  @Prop({ type: String, required: true, nullable: true })
  end_at: string | null;

  @Prop({ type: Boolean, required: true })
  has_bracket: boolean;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: true })
  league_id: number;

  @Prop({ type: Boolean, required: true })
  live_supported: boolean;

  @Prop({ type: String })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, nullable: true })
  prizepool: string | null;

  @Prop({ type: Number, required: true })
  serie_id: number;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({
    type: String,
    enum: ['S', 'A', 'B', 'C', 'D', 'Unranked'],
    required: true,
    nullable: true,
  })
  tier: string | null;

  @Prop({ type: Number, required: true })
  winner_id: number;

  @Prop({
    type: String,
    enum: ['Player', 'Team'],
    required: true,
    nullable: true,
  })
  winner_type: string | null;
}

const TournamentSchema = SchemaFactory.createForClass(Tournament);

export type SerieObjDocument = HydratedDocument<SerieObj>;

@Schema()
export class SerieObj {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true, nullable: true })
  begin_at: string | null;

  @Prop({ type: String, required: true, nullable: true })
  end_at: string | null;

  @Prop({ type: String, required: true })
  full_name: string;

  @Prop({ type: String })
  modified_at: string;

  @Prop({ type: Number, required: true })
  league_id: number;

  @Prop({ type: String, required: true, nullable: true })
  name: string | null;

  @Prop({ type: String, required: true, nullable: true })
  season: string | null;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop(
    raw({
      id: { type: Number },
      modified_at: { type: String },
      image_url: { type: String },
      name: { type: String },
      slug: { type: String },
      url: { type: String },
    }),
  )
  league: Record<string, any>;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: TournamentSchema }],
  })
  tournaments: Tournament[];

  @Prop(
    raw({
      id: { type: Number },
      name: { type: String },
      slug: { type: String },
      current_version: { type: String, nullable: true },
    }),
  )
  videogame: Record<string, any>;

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

export const SerieObjSchema = SchemaFactory.createForClass(SerieObj);
