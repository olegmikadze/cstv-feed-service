import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Incident } from 'src/schemas/incident.schema';
import { request } from 'undici';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Incident.name) private incidentModel: Model<Incident>,
  ) {}
  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }

  @Interval(60000)
  async getIncidents(): Promise<void> {
    const lastIncident = await this.incidentModel
      .findOne()
      .sort({ modified_at: -1 });

    if (lastIncident && lastIncident.modified_at) {
      const latestIncidents = await this.getLatestIncidents(
        lastIncident.modified_at,
      );

      const newIncidents = latestIncidents.filter((incident) => {
        return (
          new Date(incident.modified_at) > new Date(lastIncident.modified_at)
        );
      });

      await this.incidentModel.insertMany(newIncidents);
    } else {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const isoString = fiveMinutesAgo.toISOString().split('.')[0] + 'Z';

      const latestIncidents = await this.getLatestIncidents(isoString);

      await this.incidentModel.insertMany(latestIncidents);
    }
  }

  async getLatestIncidents(since: string): Promise<Incident[]> {
    const { body } = await request(
      `https://api.pandascore.co/incidents?sort=-modified_at&since=${since}`,
      {
        headers: {
          Authorization: 'arUjnuU_CUSMuTQ8kgvMHZqj3x47-e9FZo959ZIkvPnYeLvEAbA',
        },
      },
    );

    const cachedIncidents = await body.json();

    return cachedIncidents as Incident[];
  }
}
