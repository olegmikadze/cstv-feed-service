import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChangeDocument = HydratedDocument<Change>;

@Schema()
export class Change {
  @Prop({ required: true })
  change_type: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  modified_at: string;

  @Prop({ required: true })
  object: ChangeObject;
}

@Schema()
export class ChangeObject {
  @Prop()
  status: string;

  @Prop()
  winner_id: string;

  @Prop()
  scheduled_at: string;

  @Prop()
  begin_at: string;

  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  end_at: string | null;

  @Prop()
  results: {
    score: number;
    team_id: number;
  }[];

  @Prop()
  rescheduled: boolean;

  @Prop()
  games: {
    begin_at: string | null;
    complete: boolean;
    detailed_stats: boolean;
    end_at: string | null;
    finished: boolean;
    forfeit: boolean;
    id: number;
    length: number | null;
    match_id: number;
    position: number;
    status: string;
    winner: {
      id: number | null;
      type: string;
    };
    winner_type: string;
  }[];

  @Prop()
  league: {
    id: number;
    image_url: string;
    modified_at: string;
    name: string;
    slug: string;
    url: string | null;
  };

  @Prop()
  game_advantage: string | null;

  @Prop()
  opponents: {
    opponent: {
      acronym: string;
      id: number;
      image_url: string;
      location: string;
      modified_at: string;
      name: string;
      slug: string;
    };
    type: string;
  }[];

  @Prop()
  winner: string | null;

  @Prop()
  slug: string;

  @Prop()
  streams_list: {
    embed_url: string;
    language: string;
    main: boolean;
    official: boolean;
    raw_url: string;
  }[];

  @Prop()
  tournament_id: number;

  @Prop()
  tournament: {
    begin_at: string;
    detailed_stats: boolean;
    end_at: string;
    has_bracket: boolean;
    id: number;
    league_id: number;
    live_supported: boolean;
    modified_at: string;
    name: string;
    prizepool: string;
    serie_id: number;
    slug: string;
    tier: string;
    winner_id: number | null;
    winner_type: string;
  };

  @Prop()
  videogame_version: string | null;

  @Prop()
  original_scheduled_at: string;

  @Prop()
  videogame_title: {
    id: number;
    name: string;
    slug: string;
    videogame_id: number;
  };

  @Prop()
  detailed_stats: boolean;

  @Prop()
  serie_id: number;

  @Prop()
  videogame: {
    id: number;
    name: string;
    slug: string;
  };

  @Prop()
  live: {
    opens_at: string | null;
    supported: boolean;
    url: string | null;
  };

  @Prop()
  league_id: number;

  @Prop()
  serie: {
    begin_at: string;
    end_at: string;
    full_name: string;
    id: number;
    league_id: number;
    modified_at: string;
    name: string;
    season: string;
    slug: string;
    winner_id: number | null;
    winner_type: string;
    year: number;
  };

  @Prop()
  modified_at: string;

  @Prop()
  draw: boolean;

  @Prop()
  forfeit: boolean;

  @Prop()
  number_of_games: number;

  @Prop()
  winner_type: string;

  @Prop()
  match_type: string;
}

export const ChangeSchema = SchemaFactory.createForClass(Change);
