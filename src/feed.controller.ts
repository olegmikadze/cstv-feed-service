import { Controller } from '@nestjs/common';
import { AppService } from './feed.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'hello' })
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
