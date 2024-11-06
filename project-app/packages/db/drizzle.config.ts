import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres.lumkjmijlwmukgauuipu:StylistInspiration1234@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
  },
} satisfies Config;
