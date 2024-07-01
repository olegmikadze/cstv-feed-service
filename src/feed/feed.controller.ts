import {
  Controller,
  // Inject,
  // Get
} from '@nestjs/common';
import { FeedService } from './feed.service';
import {
  // ClientProxy,
  MessagePattern,
} from '@nestjs/microservices';

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    // @Inject('FEED_SERVICE') private readonly client: ClientProxy, //!! from outside FEED_SERVICE service
  ) {}

  @MessagePattern({ cmd: 'hello' })
  async getHello(): Promise<string> {
    return await this.feedService.getHello();
  }

  //!! from outside FEED_SERVICE service
  // @Get('/')
  // async testGetIncidents() {
  //   const pattern = { cmd: 'sum' };
  //   const data = [1, 2, 3, 4, 5];
  //   return await this.client.send<number>(pattern, data);
  // }

  @MessagePattern({ cmd: 'get-incidents' })
  async getIncidents(): Promise<any> {
    return await this.feedService.getIncidents();
  }
}
