import { Injectable } from '@nestjs/common';

import { request } from 'undici';

@Injectable()
export class FeedService {
  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }

  async getIncidents(): Promise<any> {
    const incidents = await request('https://api.pandascore.co/incidents');

    console.log(
      '🚀 ~ file: feed.service.ts:14 ~ FeedService ~ getIncidents ~ incidents:',
      incidents,
    );

    return incidents;
  }
}
