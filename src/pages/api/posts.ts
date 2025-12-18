import type { APIRoute } from "astro";
import prisma from "../../lib/prisma"

export const GET: APIRoute = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};