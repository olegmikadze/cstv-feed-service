import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Incident, IncidentSchema } from 'src/schemas/incident.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'FEED_SERVICE', transport: Transport.RMQ }, //!! from outside FEED_SERVICE service
    ]),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cstv-feed.mcikufr.mongodb.net/?retryWrites=true&w=majority&appName=cstv-feed',
    ),
    MongooseModule.forFeature([
      { name: Incident.name, schema: IncidentSchema },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
