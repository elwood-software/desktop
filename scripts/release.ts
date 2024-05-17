#!/usr/bin/env -S deno run --allow-run --allow-net --allow-env --allow-read

/**
 * seed-storage.ts
 *
 * This script seeds Supabase storage with files from a GitHub repository.
 * By default, it looks for a local running install of Supabase,
 * but you can use the env variables below to point to a remote Supabase instance.
 *
 * Environment Variables:
 * GITHUB_TOKEN: GitHub token to access the seed repository to overcome rate limits
 * ADD_BUCKET_RESTRICTIONS: Add size & mime-type upload restrictions to the buckets
 * SUPABASE_URL: The URL of the Supabase instance
 * SUPABASE_SERVICE_ROLE_KEY: The service role key of the Supabase instance
 *
 * Usage:
 * ./seed-storage.ts
 *
 * Have questions, email us at hello@elwood.software
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSync } from "https://deno.land/std@0.220.1/dotenv/mod.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env");

const env = loadSync({
  envPath,
});

const cmd = new Deno.Command("pnpm", {
  args: ["run", "release"],
  cwd: path.join(__dirname, "../elwood/apps/desktop"),
  env: {
    ...env,
    CI: "true",
  },
  stderr: "inherit",
  stdout: "inherit",
});

const { code } = await cmd.output();

Deno.exit(code);
