import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();

const connectionString =
  "postgresql://postgres.ypdybqbvodyehpngxtmu:StylistInspiration1234@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
const client = postgres(connectionString);

// const local= "postgresql://postgres:postgres@localhost:54322/postgres"

export const db = drizzle(client, { schema });
