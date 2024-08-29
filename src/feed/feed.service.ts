import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidentDoc } from 'src/schemas/incident.schema';
import { request } from 'undici';
import { ConfigService } from '@nestjs/config';
import { IncidentType } from 'src/types/incident.types';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    @InjectModel(IncidentDoc.name) private incidentModel: Model<IncidentDoc>,
    private configService: ConfigService,
  ) {}

  @Interval(60000)
  async loadIncidents(): Promise<void> {
    const minuteInMs = new Date(Date.now() - 60000);
    const timestampInMsISO = minuteInMs.toISOString().split('.')[0] + 'Z';

    this.logger.debug(`Loading incidents since: ${timestampInMsISO}`);

    const latestIncidents = await this.getLatestIncidents(timestampInMsISO);

    for await (const inc of latestIncidents) {
      this.logger.debug(`Processing incident: ${inc.id}`);

      const incidentExists = await this.incidentModel.findOne({
        id: inc.id,
      });

      if (!incidentExists) {
        this.logger.debug(`Incident ${inc.id} does not exist, CREATING...`);

        const createdIncidentDoc = new this.incidentModel({
          id: inc.id,
          modified_at: inc.modified_at,
          type: inc.type,
          logs: [{ change_type: inc.change_type, object: inc.object }],
        });
        await createdIncidentDoc.save();
        break;
      }

      incidentExists.modified_at = inc.modified_at;
      incidentExists.logs.push({
        change_type: inc.change_type,
        object: inc,
      });
      await incidentExists.save();

      this.logger.debug(`Incident ${inc.id} UPDATED`);
    }
  }

  async getLatestIncidents(since: string): Promise<IncidentType[]> {
    const { body } = await request(
      `${this.configService.get<string>('PANDASCORE_API_URL')}?sort=-modified_at&since=${since}`,
      {
        headers: {
          Authorization: this.configService.get<string>('PANDASCORE_API_KEY'),
        },
      },
    );

    const cachedIncidents = await body.json();

    return cachedIncidents as IncidentType[];
  }
}
