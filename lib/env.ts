import { z } from "zod";

// Treat empty strings as undefined for all optional keys.
const optStr = z.string().transform((v) => v || undefined).optional();
const optUrl  = z.string().transform((v) => v || undefined).optional();

const schema = z.object({
  NEXT_PUBLIC_SITE_URL:                optUrl,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:  optStr,
  STRIPE_SECRET_KEY:                   optStr,
  STRIPE_WEBHOOK_SECRET:               optStr,
  NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY:   optStr,
  AFFIRM_PRIVATE_API_KEY:              optStr,
  NEXT_PUBLIC_AFFIRM_JS_URL:           optUrl,
  PRINTFUL_API_KEY:                    optStr,
  PRINTIFY_API_KEY:                    optStr,
  ARTSADD_API_KEY:                     optStr,
  ARTSADD_BASE_URL:                    optUrl,
  PRINTIFY_SHOP_ID:                    optStr,
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL:               process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY:                  process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET:              process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY:  process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_API_KEY,
  AFFIRM_PRIVATE_API_KEY:             process.env.AFFIRM_PRIVATE_API_KEY,
  NEXT_PUBLIC_AFFIRM_JS_URL:          process.env.NEXT_PUBLIC_AFFIRM_JS_URL,
  PRINTFUL_API_KEY:                   process.env.PRINTFUL_API_KEY,
  PRINTIFY_API_KEY:                   process.env.PRINTIFY_API_KEY,
  ARTSADD_API_KEY:                    process.env.ARTSADD_API_KEY,
  ARTSADD_BASE_URL:                   process.env.ARTSADD_BASE_URL,
  PRINTIFY_SHOP_ID:                   process.env.PRINTIFY_SHOP_ID,
});
