import { Module } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), FeedModule],
})
export class AppModule {}
