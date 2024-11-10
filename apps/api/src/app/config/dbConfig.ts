import { z } from "zod";

const DatabaseConnectionsConfig = z.object({
  default: z.object({
    host: z.string(),
    port: z.number(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
  }),
});

export type DatabaseConnectionsConfig = z.infer<
  typeof DatabaseConnectionsConfig
>;

export function buildDbConfig(): DatabaseConnectionsConfig {
  const config = {
    default: {
      host: process.env.POSTGRES_HOST,
      port:
        Number(process.env.POSTGRES_PORT) +
        (Number(process.env.VITEST_WORKER_ID) || 0),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  };
  return DatabaseConnectionsConfig.parse(config);
}
