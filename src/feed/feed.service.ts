import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }
}
