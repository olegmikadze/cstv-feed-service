import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoosesSchema } from 'mongoose';
import { League } from './league.schema';

export type VideogameDocument = HydratedDocument<Videogame>;

@Schema()
export class Videogame {
  @Prop({ type: String, required: true, nullable: true })
  current_version: string | null;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({
    type: [
      { type: MongoosesSchema.Types.ObjectId, ref: 'League', required: true },
    ],
  })
  leagues: League[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  slug: string;
}

export const VideogameSchema = SchemaFactory.createForClass(Videogame);
