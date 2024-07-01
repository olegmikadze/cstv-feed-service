import { Controller } from '@nestjs/common';
import { FeedService } from './feed.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @MessagePattern({ cmd: 'hello' })
  async getHello(): Promise<string> {
    return await this.feedService.getHello();
  }

  @MessagePattern({ cmd: 'get-incidents' })
  async getIncidents(data: number[]): Promise<number> {
    console.log('good test');
    return (data || []).reduce((a, b) => a + b);
  }
}
