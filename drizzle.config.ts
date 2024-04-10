import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  driver: "pg",
  out: "./src/lib/db",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL_NON_POOLING ?? "",
  },
} satisfies Config;
