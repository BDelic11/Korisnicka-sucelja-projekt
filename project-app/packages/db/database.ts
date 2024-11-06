import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const connectionString =
  'postgresql://postgres.lumkjmijlwmukgauuipu:StylistInspiration1234@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
