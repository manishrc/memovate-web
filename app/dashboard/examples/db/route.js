import db from "@/db";
import { test } from "@/db/schema";
import { sql } from "drizzle-orm";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on iad1
export const dynamic = "force-dynamic"; // no caching

export async function GET(req, ctx) {
  let dbRed = [];
  const startTime = Date.now();

  // Create a record and return it
  dbRed = await db
    .insert(test)
    .values({ id: 1, count: 1 })
    .onConflictDoUpdate({
      target: test.id,
      set: { count: sql`${test.count} + 1` },
    })
    .returning({ id: test.id, count: test.count });

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Return
  return new Response(JSON.stringify({ dbRed, executionTime }, null, 2), {
    headers: { "content-type": "application/json" },
  });
}
