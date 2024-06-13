import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Change } from 'src/schemas/change.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Change', schema: Change }])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
