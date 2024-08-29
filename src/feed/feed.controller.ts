import { Controller } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller()
export class FeedController {
  constructor(private feedService: FeedService) {}
}
