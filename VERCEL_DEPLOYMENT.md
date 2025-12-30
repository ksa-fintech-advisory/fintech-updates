# Deploying to Vercel (Free Tier)

This guide walks you through deploying your Next.js application to Vercel's free tier, specifically addressing the changes needed to switch from **SQLite** (local development) to **Postgres** (production).

## Prerequisites
- A [Vercel Account](https://vercel.com/signup).
- The Vercel CLI installed (optional but recommended) or GitHub integration.

## Step 1: Create a Vercel Project

1.  Push your code to a GitHub repository.
2.  Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  In the **Configure Project** screen, **DO NOT** deploy yet.

## Step 2: Set up Vercel Postgres

Since SQLite is a file-based database, it won't work in Vercel's serverless environment. You need a cloud database. Vercel provides a free Postgres database.

1.  In your Vercel Project Dashboard, go to the **Storage** tab.
2.  Click **"Connect Store"**.
3.  Select **Postgres**.
4.  Accept the terms and click **"Create"**.
5.  Select a region (choose one close to your users/function region, e.g., Washington, D.C. - iad1).
6.  Once created, go to the **.env.local** tab in the database page. It will show you the environment variables you need.

## Step 3: Configure Environment Variables

1.  Go to your Project Settings -> **Environment Variables**.
2.  When you connected the Postgres database in Step 2, Vercel should have automatically added the necessary variables (`POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.).
3.  **Important**: You need to ensure your `DATABASE_URL` uses the `POSTGRES_PRISMA_URL` value.
    - Check if `DATABASE_URL` is already set. If not, add it and set the value to the same value as `POSTGRES_PRISMA_URL`.
    - Also add any other environment variables your app needs (e.g., `NEXT_PUBLIC_FIREBASE_...`).

## Step 4: Update Prisma Schema for Production

You have two options:
1.  **Separate Schema (Recommended for keeping SQLite locally)**: Keep `schema.prisma` as is for local dev, but for deployment, Vercel needs to see `provider = "postgresql"`.

    **The easiest way** is to update your `prisma/schema.prisma` just before deploying or use an environment variable for the provider if Prisma supports it (currently it's static).

    **Recommended Approach**:
    Change your `prisma/schema.prisma` datasource block to look like this **before pushing to production**:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```

    *Note: If you want to keep SQLite locally, you just have to be careful not to commit this change if you want to keep working with SQLite, OR simpler: switch your local dev to use a local Postgres instance (or the same Vercel Postgres DB) so dev and prod match.*

## Step 5: Run Migrations on Vercel

Vercel needs to create the tables in your new Postgres database.

1.  Add a "Build Command" override or use the Vercel dashboard command runner (if available), but the standard way is to run migrations during build or via a separate script.
2.  **Best Practice**: Run migrations locally against the production DB *once* to key it up, or add a build command.

    **Option A: Run from your machine (Easiest)**
    1.  Pull the Vercel env vars locally:
        `vercel env pull .env.production.local`
    2.  Switch your `schema.prisma` to `postgresql`.
    3.  Run the migration:
        `npx prisma migrate deploy` (This applies existing migrations)
        *Or if you are starting fresh with no migration history:*
        `npx prisma db push`

    **Option B: Add to Build Command**
    In Vercel Project Settings -> General -> **Build & Development Settings**:
    - Change **Build Command** to: `npx prisma generate && npx prisma migrate deploy && next build`

## Step 6: Deploy

1.  Commit your changes (including the `package.json` with the new `postinstall` script).
2.  If you haven't triggered a deploy yet, push to main.
3.  Vercel will detect the push, run `npm install`, run `postinstall` (`prisma generate`), and then build your app.

## Troubleshooting

-   **"P1003: SQLite database file doesn't exist"**: You forgot to switch the provider to `postgresql`.
-   **Missing Tables**: You didn't run `prisma migrate deploy` or `prisma db push` against the production database.
-   **Type Errors**: TypeScript might complain if you generated the client for SQLite but tried to use it with Postgres features (unlikely in basic usage). Run `prisma generate` again.
