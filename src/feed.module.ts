import { Module } from '@nestjs/common';
import { AppController } from './feed.controller';
import { AppService } from './feed.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class FeedModule {}
