import { z } from 'zod';

// Centralized environment validation and parsing. Use this module across server code to
// fail fast if required variables are missing in production.
const rawEnv = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_TO: process.env.RESEND_TO,
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
  NEXT_PUBLIC_TURNSTILE_SITEKEY: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX ?? '5',
  RATE_LIMIT_WINDOW_HOURS: process.env.RATE_LIMIT_WINDOW_HOURS ?? '1',
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
  RESEND_TO: z.string().optional(),
  TURNSTILE_SECRET: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITEKEY: z.string().optional(),
  RATE_LIMIT_MAX: z.number().int().positive(),
  RATE_LIMIT_WINDOW_HOURS: z.number().int().positive(),
});

export const env = envSchema.parse({
  ...rawEnv,
  RATE_LIMIT_MAX: Number(rawEnv.RATE_LIMIT_MAX),
  RATE_LIMIT_WINDOW_HOURS: Number(rawEnv.RATE_LIMIT_WINDOW_HOURS),
});

export type Env = typeof env;