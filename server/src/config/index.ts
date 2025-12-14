import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  TRUST_PROXY: z.coerce.boolean().default(false),
  LOG_LEVEL: z.string().default('info'),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  cors: {
    origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    credentials: true,
  },
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    windowMs: 15 * 60 * 1000,
  },
  trustProxy: env.TRUST_PROXY,
  logLevel: env.LOG_LEVEL,
} as const;

export type Config = typeof config;
