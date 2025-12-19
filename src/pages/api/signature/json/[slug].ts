// I've decided to fetch the signature from the slug so its easier for users to get the signature of a post since they do not know the post's ID.

export const prerender = false;

import type { APIRoute } from "astro";
import prisma from "../../../../lib/prisma"

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const post = await prisma.post.findFirst({
    where: { slug: slug, published: true },
    select: { signature: true },
  });

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ signature: post.signature }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}