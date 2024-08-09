import { Schema as MongooseSchema } from 'mongoose';

// Function to create a schema excluding certain fields
export default function createPartialSchema(
  schema: MongooseSchema,
  excludeFields: string[],
) {
  const partialSchema = { ...schema.obj };
  excludeFields.forEach((field) => delete partialSchema[field]);
  return new MongooseSchema(partialSchema);
}
