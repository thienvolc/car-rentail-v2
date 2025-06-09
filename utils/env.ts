import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  API_KEY: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
