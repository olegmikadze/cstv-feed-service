import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { League } from './league.schema';
import { Match } from './match.schema';
import { Serie } from './serie.schema';
import { Tournament } from './tournament.schema';
import { Player } from './player.schema';
import { Team } from './team.schema';
import { DeletionIncident } from './deletion-object.schema';

export type IncidentDocument = HydratedDocument<Incident>;
@Schema()
export class Incident {
  @Prop({
    type: String,
    enum: ['deletion', 'creation', 'update'],
    required: true,
  })
  change_type: string;

  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  modified_at: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  object:
    | League
    | Serie
    | Tournament
    | Match
    | Team
    | Player
    | DeletionIncident;

  @Prop({
    type: String,
    enum: ['league', 'match', 'player', 'serie', 'team', 'tournament'],
    required: true,
  })
  type: string;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
