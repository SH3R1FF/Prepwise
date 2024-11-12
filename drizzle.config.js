import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './utils/drizzle/migrations',
  schema: './utils/drizzle/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
  },
});
