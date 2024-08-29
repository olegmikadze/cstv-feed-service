import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { League } from './league.schema';
// import { Match } from './match.schema';
// import { Serie } from './serie.schema';
// import { Tournament } from './tournament.schema';
// import { Player } from './player.schema';
// import { Team } from './team.schema';
// import { DeletionIncident } from './deletion-object.schema';

@Schema()
export class Log {
  @Prop({ type: String })
  change_type: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  object: any;
  // | League
  // | Serie
  // | Tournament
  // | Match
  // | Team
  // | Player
  // | DeletionIncident;
}
const LogSchema = SchemaFactory.createForClass(Log);

export type IncidentDocument = HydratedDocument<IncidentDoc>;
@Schema()
export class IncidentDoc {
  @Prop({ type: Number, unique: true })
  id: number;

  @Prop({ type: String })
  modified_at: string;

  @Prop({ type: [LogSchema] })
  logs: Log[];

  @Prop({
    type: String,
    enum: ['league', 'match', 'player', 'serie', 'team', 'tournament'],
  })
  type: string;
}

export const IncidentSchema = SchemaFactory.createForClass(IncidentDoc);
