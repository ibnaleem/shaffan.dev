export const prerender = false;

import type { APIRoute } from "astro";
import prisma from "../../../lib/prisma"

export const GET: APIRoute = async ({ params }) => {

  const { slug } = params;

  const post = await prisma.post.findFirst({
    where: { slug: slug, published: true },
    select: { id: true, title: true, content: true, slug: true, signature: true, createdAt: true }
  })

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};