import type { APIRoute } from "astro";
import { readFileSync } from "fs";

export const GET: APIRoute = async () => {
  const pgpKey = readFileSync("dist/client/pgp.txt", "utf-8");

  return new Response(pgpKey, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="shaffan-pgp.txt"',
    },
  })
}