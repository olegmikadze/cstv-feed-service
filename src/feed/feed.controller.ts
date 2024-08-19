import { Controller } from '@nestjs/common';
import { FeedService } from './feed.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class FeedController {
  constructor(private feedService: FeedService) {}

  @MessagePattern({ cmd: 'hello' })
  async getHello(): Promise<string> {
    return await this.feedService.getHello();
  }
}
