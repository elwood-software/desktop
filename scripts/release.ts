#!/usr/bin/env -S deno run --allow-run --allow-net --allow-env --allow-read

/**
 * seed-storage.ts
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

const cmd = new Deno.Command("./node_modules/.bin/electron-builder", {
  args: ["-p", "always"],
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
