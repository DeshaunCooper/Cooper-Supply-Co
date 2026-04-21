# Cooper Supply Starter

## Local setup

1. Copy `.env.local.example` to `.env.local`
2. Install dependencies

```bash
npm install
```

3. Run dev server

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Vercel deploy

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables from `.env.local.example` in the Vercel dashboard.
4. Redeploy.
5. Add a Stripe webhook pointing to `/api/webhooks/stripe`.

## Notes

- Product images are placeholders. Replace them with real photography.
- Mascot files are placeholders. Replace them with final sprite/vector assets.
- Artsadd is still an adapter placeholder because their public integration path is less straightforward.
