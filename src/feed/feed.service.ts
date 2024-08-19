import { Injectable, Logger } from '@nestjs/common';
import { Interval, Timeout } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Incident } from 'src/schemas/incident.schema';
import { request } from 'undici';
import { ConfigService } from '@nestjs/config';
import findDifference from 'src/utils/find-object-diff';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    @InjectModel(Incident.name) private incidentModel: Model<Incident>,
    private configService: ConfigService,
  ) {}

  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }

  // @Timeout(5000)
  // async handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds!!!');

  //   const incidentsExists = null;

  //   if (incidentsExists) {
  //     return;
  //   }

  //   await this.uploadAllIncidents();
  // }

  // async uploadAllIncidents(): Promise<void> {
  //   let page = 1;
  //   const per_page = 20;

  //   while (true) {
  //     const { body } = await request(
  //       `${this.configService.get<string>('PANDASCORE_API_URL')}?page=${page}&per_page=${per_page}`,
  //       {
  //         headers: {
  //           Authorization: this.configService.get<string>('PANDASCORE_API_KEY'),
  //         },
  //       },
  //     );

  //     const incidents = await body.json();
  //     console.log(
  //       '🚀 ~ file: feed.service.ts:51 ~ FeedService ~ uploadAllIncidents ~ incidents:',
  //       JSON.stringify(incidents),
  //     );

  //     if (!incidents) {
  //       break;
  //     }

  //     console.log(
  //       '🚀 ~ file: feed.service.ts:51 ~ FeedService ~ uploadAllIncidents ~ incidents:',
  //       page,
  //     );

  //     page++;
  //   }

  //   console.log(
  //     '🚀 ~ file: feed.service.ts:62 ~ FeedService ~ uploadAllIncidents ~ page:',
  //     page,
  //   );
  //   console.log(
  //     '🚀 ~ file: feed.service.ts:59 ~ FeedService ~ uploadAllIncidents ~ length:',
  //     length,
  //   );
  // }

  @Interval(20000)
  async getIncidents(): Promise<void> {
    const lastIncident = await this.incidentModel
      .findOne()
      .sort({ modified_at: -1 });

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const isoString = fiveMinutesAgo.toISOString().split('.')[0] + 'Z';

    const timestamp =
      lastIncident && lastIncident.modified_at
        ? lastIncident.modified_at
        : isoString;

    const latestIncidents = await this.getLatestIncidents(timestamp);

    for await (const incident of latestIncidents) {
      const incidentExists = await this.incidentModel.findOne({
        id: incident.id,
      });

      if (incidentExists) {
        const diff = findDifference(incidentExists, incident);

        const newState = {
          modified_at: diff['modified_at'],
          object: diff['object'],
        };

        if (
          incidentExists.modified_at &&
          diff['modified_at'] &&
          new Date(incidentExists.modified_at) < newState.modified_at
        ) {
          await this.incidentModel.findOneAndUpdate(
            { id: incidentExists.id },
            { $set: newState },
          );
          console.log('UPDATE');
        }
      } else {
        const createdIncident = new this.incidentModel(incident);
        await createdIncident.save();
        console.log('CREATE');
      }
    }
  }

  async getLatestIncidents(since: string): Promise<Incident[]> {
    const { body } = await request(
      `${this.configService.get<string>('PANDASCORE_API_URL')}?sort=-modified_at&since=${since}`,
      {
        headers: {
          Authorization: this.configService.get<string>('PANDASCORE_API_KEY'),
        },
      },
    );

    const cachedIncidents = await body.json();

    return cachedIncidents as Incident[];
  }
}
