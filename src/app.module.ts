import { Module } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FeedModule,
  ],
})
export class AppModule {}
