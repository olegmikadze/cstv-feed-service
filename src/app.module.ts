import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cstv-feed.mcikufr.mongodb.net/?retryWrites=true&w=majority&appName=cstv-feed',
    ),
    FeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
