/** @type { import("drizzle-kit").Config } */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined. Make sure to `vc env pull` to get `.env.local`'
  );
}

const config = {
  schema: './db/schema.js',
  out: './db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
};

export default config;
