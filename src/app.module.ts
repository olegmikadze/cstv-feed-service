import { Module } from '@nestjs/common';
import { AppController as AddController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [MongooseModule.forRoot('ADD_LINK'), FeedModule],
  controllers: [AddController],
  providers: [AppService],
})
export class AppModule {}
