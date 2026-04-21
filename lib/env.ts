import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY: z.string().min(1).optional(),
  AFFIRM_PRIVATE_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_AFFIRM_JS_URL: z.url().optional(),
  PRINTFUL_API_KEY: z.string().min(1).optional(),
  PRINTIFY_API_KEY: z.string().min(1).optional(),
  ARTSADD_API_KEY: z.string().optional(),
  ARTSADD_BASE_URL: z.url().optional(),
  PRINTIFY_SHOP_ID: z.string().optional(),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY,
  AFFIRM_PRIVATE_API_KEY: process.env.AFFIRM_PRIVATE_API_KEY,
  NEXT_PUBLIC_AFFIRM_JS_URL: process.env.NEXT_PUBLIC_AFFIRM_JS_URL,
  PRINTFUL_API_KEY: process.env.PRINTFUL_API_KEY,
  PRINTIFY_API_KEY: process.env.PRINTIFY_API_KEY,
  ARTSADD_API_KEY: process.env.ARTSADD_API_KEY,
  ARTSADD_BASE_URL: process.env.ARTSADD_BASE_URL,
  PRINTIFY_SHOP_ID: process.env.PRINTIFY_SHOP_ID,
});
