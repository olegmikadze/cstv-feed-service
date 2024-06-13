import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [MongooseModule.forRoot('ADD_LINK'), FeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
