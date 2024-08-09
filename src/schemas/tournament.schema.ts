import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Player } from './player.schema';
import { Team } from './team.schema';
import { League } from './league.schema';
import { Serie } from './serie.schema';
import { Videogame } from './videogame.schema';

@Schema()
export class ExpectedRoster {
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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Team',
    required: true,
  })
  team: Team;
}

const ExpectedRosterSchema = SchemaFactory.createForClass(ExpectedRoster);

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
  @Prop({ type: String, required: true, nullable: true })
  begin_at: string | null;

  @Prop({ type: Boolean, required: true })
  detailed_stats: boolean;

  @Prop({ type: String, required: true, nullable: true })
  end_at: string | null;

  @Prop({ type: [ExpectedRosterSchema], required: true })
  expected_roster: ExpectedRoster[];

  @Prop({ type: Boolean, required: true })
  has_bracket: boolean;

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

  @Prop({ type: Boolean, required: true })
  live_supported: boolean;

  //   @Prop({
  //     type: [
  //       {
  //         type: MongooseSchema.Types.ObjectId,
  //         ref: 'Match',
  //         required: true,
  //       },
  //     ],
  //   })
  //   matches: Match[];

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, nullable: true })
  prizepool: string | null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Serie',
    required: true,
  })
  serie: Serie;

  @Prop({ type: Number, required: true })
  serie_id: number;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Team',
        required: true,
      },
    ],
  })
  teams: Team[];

  @Prop({
    type: String,
    enum: ['S', 'A', 'B', 'C', 'D', 'Unranked'],
    required: true,
    nullable: true,
  })
  tier: string | null;

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

  @Prop({
    type: String,
    enum: ['Team', 'Player'],
    required: true,
    nullable: true,
  })
  winner_type: string | null;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
