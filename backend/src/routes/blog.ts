import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { createblog, updateblog } from '@saudsayyed/medium-common';
import { useId } from 'hono/jsx';

export let BlogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for JWT Authentication
BlogRoute.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized: Missing or invalid token" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id as string);
    await next();
  } catch (err) {
    return c.json({ status: 401, message: "Unauthorized or invalid token" }, 401);
  }
});

// Create Post
BlogRoute.post('/create', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const { success } = createblog.safeParse(body);
  if (!success) {
    return c.json({ message: "Incorrect input format" }, 400);
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userId),
      },
    });

    return c.json({ id: post.id });
  } catch (err) {
    console.error("Error creating post:", err);
    return c.json(
      { error: "Error while creating post", details: err },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

// Get All Posts
BlogRoute.get('/blogs', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: { select: { name: true } },
      },
    });
    return c.json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return c.json({ error: "Error fetching posts" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

// Update Post
BlogRoute.put('/update', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateblog.safeParse(body);
  if (!success) {
    return c.json({ message: "Incorrect input format" }, 400);
  }

  try {
    const post = await prisma.post.update({
      where: { id: body.id },
      data: { title: body.title, content: body.content },
    });

    return c.json({ id: post.id });
  } catch (err) {
    console.error("Error updating post:", err);
    return c.json({ error: "Error updating post", details: err }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

// Get Single Post by ID
BlogRoute.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: { id: Number(id) },
      select: {
        title: true,
        content: true,
        id: true,
        author: { select: { name: true } },
      }
    });
    if (!post) {
      return c.json({ message: "Post not found" }, 404);
    }
    return c.json({ post });
  } catch (err) {
    console.error("Error fetching post:", err);
    return c.json({ message: "Error while fetching blog post" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

BlogRoute.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userId = c.get("userId");
    const id = c.req.param("id");

    let post = await prisma.post.findFirst({
      where: {
        id: Number(id),
        authorId: Number(userId)
      }
    });

    if (!post) {
      return c.json({
        message: "Post not found or you do not have permission to delete this post.",
      }, 401)
    }

    let deletpost = await prisma.post.delete({
      where: {
        id: Number(id),
      }
    });

    return c.json({
      message: "post deleted",
      status: 200,
      deletpost,
    })
  } catch (err) {
    return c.json({
      message: err
    })
  }

})