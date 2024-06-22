import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dbSchema from './schema';

const client = neon(process.env.DATABASE_POOL_URL, {
  fetchOptions: {
    cache: 'no-store',
  },
});

export const schema = dbSchema;
const db = drizzle(client, { schema: dbSchema });
export default db;

export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = process.env.DATABARE_REGION; // keep close to db region
export const dynamic = 'force-dynamic'; // no caching
