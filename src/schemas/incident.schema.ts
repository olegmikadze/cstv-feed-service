import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LeagueObj } from './league-object.schema';
import { MatchObj } from './match-object.schema';
import { SerieObj } from './serie-object.schema';

export type IncidentDocument = HydratedDocument<Incident>;

enum ChangeType {
  Deletion = 'deletion',
  Creation = 'creation',
  Update = 'update',
}

enum Type {
  League = 'league',
  Match = 'match',
  Player = 'player',
  Serie = 'serie',
  Team = 'team',
  Tournament = 'tournament',
}

@Schema()
export class Incident {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String, enum: ChangeType })
  change_type: ChangeType;

  @Prop({ type: String })
  modified_at: string;

  @Prop({ type: String, enum: Type, required: true })
  type: Type;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  object: LeagueObj | MatchObj | SerieObj;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
