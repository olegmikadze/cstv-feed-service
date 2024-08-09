import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { League } from './league.schema';
import { Serie } from './serie.schema';
import { Tournament } from './tournament.schema';
import { Videogame } from './videogame.schema';
import { Player } from './player.schema';
import { Team } from './team.schema';

export type OpponentItemDocument = HydratedDocument<OpponentItem>;

@Schema()
export class OpponentItem {
  @Prop({ type: String, enum: ['Player', 'Team'], required: true })
  opponent: string;

  @Prop({ type: String, required: true })
  type: string;
}

export const OpponentItemDocument = SchemaFactory.createForClass(OpponentItem);

export type GameItemDocument = HydratedDocument<GameItem>;

@Schema()
export class GameItem {
  @Prop({ type: String, required: false, nullable: true })
  begin_at: string | null;

  @Prop({ type: Boolean, required: true })
  complete: boolean;

  @Prop({ type: Boolean, required: true })
  detailed_stats: boolean;

  @Prop({ type: String, required: false, nullable: true })
  end_at: string | null;

  @Prop({ type: Boolean, required: true })
  finished: boolean;

  @Prop({ type: Boolean, required: true })
  forfeit: boolean;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: false, nullable: true })
  length: number | null;

  @Prop({ type: Number, required: true })
  match_id: number;

  @Prop({ type: Number, required: true })
  position: number;

  @Prop({
    type: String,
    enum: ['finished', 'not_played', 'not_started', 'running'],
    required: true,
  })
  status: string;

  @Prop({
    type: {
      id: Number,
      type: { type: String, enum: ['Player', 'Team'] },
    },
    required: true,
  })
  winner: {
    id: number;
    type: string;
  };

  @Prop({
    type: String,
    enum: ['Player', 'Team'],
    required: false,
    nullable: true,
  })
  winner_type: string | null;
}

export const GameItemSchema = SchemaFactory.createForClass(GameItem);

export type LiveItemDocument = HydratedDocument<LiveItem>;

@Schema()
export class LiveItem {
  @Prop({ type: String, required: false, nullable: true })
  opens_at: string | null;

  @Prop({ type: Boolean, required: true })
  supported: boolean;

  @Prop({ type: String, required: false, nullable: true })
  url: string | null;
}

export const LiveItemSchema = SchemaFactory.createForClass(LiveItem);

export type MapPicksDocument = HydratedDocument<MapPicks>;

@Schema()
export class MapPicks {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true })
  image_url: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  picking_team_id: number;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: [String], required: true })
  videogame_versions: string[];
}

export const MapPicksSchema = SchemaFactory.createForClass(MapPicks);

export type PlayerResultDocument = HydratedDocument<PlayerResult>;

@Schema()
export class PlayerResult {
  @Prop({ type: Number, required: true })
  player_id: number;

  @Prop({ type: Number, required: true })
  score: number;
}

export const PlayerResultSchema = SchemaFactory.createForClass(PlayerResult);

export type TeamResultDocument = HydratedDocument<TeamResult>;

@Schema()
export class TeamResult {
  @Prop({ type: Number, required: true })
  score: number;

  @Prop({ type: Number, required: true })
  team_id: number;
}

export const TeamResultSchema = SchemaFactory.createForClass(TeamResult);

export type StreamsListDocument = HydratedDocument<StreamsList>;

@Schema()
export class StreamsList {
  @Prop({ type: String, required: true, nullable: true })
  embed_url: string | null;

  // aa ab ae af ak am an ar as av ay az ba be bg bh bi bm bn bo br bs ca ce ch co cr cs cu cv cy da de dv dz ee el en eo es et eu fa ff fi fj fo fr fy ga gd gl gn gu gv ha he hi ho hr ht hu hy hz ia id ie ig ii ik io is it iu ja jv ka kg ki kj kk kl km kn ko kr ks ku kv kw ky la lb lg li ln lo lt lu lv mg mh mi mk ml mn mr ms mt my na nb nd ne ng nl nn no nr nv ny oc oj om or os pa pi pl ps pt qu rm rn ro ru rw sa sc sd se sg si sk sl sm sn so sq sr ss st su sv sw ta te tg th ti tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa wo xh yi yo za zh zu
  @Prop({ type: String, required: true })
  language: string;

  @Prop({ type: Boolean, required: true })
  main: boolean;

  @Prop({ type: Boolean, required: true })
  official: boolean;

  @Prop({ type: String, required: true })
  raw_url: string;
}

export const StreamsListSchema = SchemaFactory.createForClass(StreamsList);

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
  @Prop({ type: String, required: true, nullable: true })
  begin_at: string | null;

  @Prop({ type: Boolean, required: true })
  detailed_stats: boolean;

  @Prop({ type: Boolean, required: true })
  draw: boolean;

  @Prop({ type: String, required: true, nullable: true })
  end_at: string | null;

  @Prop({ type: Boolean, required: true })
  forfeit: boolean;

  @Prop({ type: Number, required: true, nullable: true })
  game_advantage: number | null;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'GameItem', required: true },
    ],
  })
  game: GameItem[];

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'League', required: true })
  league: League;

  @Prop({ type: Number, required: true })
  league_id: number;

  @Prop({ type: LiveItemSchema, required: true })
  live: LiveItem;

  //Only applies to Valorant matches. The field will not be present on other video games matches.
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'MapPicks',
    required: true,
    nullable: true,
  })
  map_picks: MapPicks | null;

  @Prop({
    type: String,
    enum: [
      'all_games_played',
      'best_of',
      'custom',
      'first_to',
      'ow_best_of',
      'red_bull_home_ground',
    ],
    required: true,
  })
  match_type: string;

  @Prop({ type: String, required: true })
  modified_at: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  number_of_games: number;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'OpponentItem',
        required: true,
      },
    ],
  })
  opponents: OpponentItem[];

  @Prop({ type: String, required: true, nullable: true })
  original_scheduled_at: string | null;

  @Prop({ type: Boolean, required: true, nullable: true })
  rescheduled: boolean | null;

  @Prop({ type: [{ type: MongooseSchema.Types.Mixed, required: true }] })
  results: (TeamResult | PlayerResult)[];

  @Prop({ type: String, required: true, nullable: true })
  scheduled_at: string | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Serie', required: true })
  serie: Serie;

  @Prop({ type: Number, required: true })
  serie_id: number;

  @Prop({ type: String, required: true, nullable: true })
  slug: string | null;

  @Prop({
    type: String,
    enum: ['canceled', 'finished', 'not_started', 'postponed', 'running'],
    required: true,
  })
  status: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'StreamsList',
        required: true,
      },
    ],
  })
  streams_list: StreamsList;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  })
  tournament: Tournament;

  @Prop({ type: Number, required: true })
  tournament_id: number;

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

  @Prop({
    type: {
      current: Boolean,
      name: String,
    },
    required: true,
  })
  videogame_version: {
    current: boolean;
    name: string;
  };

  @Prop({
    type: MongooseSchema.Types.Mixed,
    required: true,
  })
  winner: Player | Team;

  @Prop({
    type: Number,
    required: true,
  })
  winner_id: number;

  @Prop({
    type: String,
    enum: ['Player', 'Team'],
    required: true,
  })
  winner_type: string;
}

export const MatchDocument = SchemaFactory.createForClass(Match);
