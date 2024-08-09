import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/schemas/team.schema';
import { Videogame, VideogameSchema } from 'src/schemas/videogame.schema';
import { League, LeagueSchema } from 'src/schemas/league.schema';
import { Player, PlayerSchema } from 'src/schemas/player.schema';
import { Serie, SerieSchema } from 'src/schemas/serie.schema';
import { Tournament, TournamentSchema } from 'src/schemas/tournament.schema';
import { Incident, IncidentSchema } from 'src/schemas/incident.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cstv-feed.mcikufr.mongodb.net/?retryWrites=true&w=majority&appName=cstv-feed',
    ),
    MongooseModule.forFeature([
      { name: Incident.name, schema: IncidentSchema },
      { name: Team.name, schema: TeamSchema },
      { name: Videogame.name, schema: VideogameSchema },
      { name: Tournament.name, schema: TournamentSchema },
      { name: League.name, schema: LeagueSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Serie.name, schema: SerieSchema },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
