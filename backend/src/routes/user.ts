import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'

export let UserRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

UserRoute.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  if (!body.email || !body.password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }
  const password = body.password;

  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedpassword,
      },
    });
    //@ts-ignore
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
      user,
    });

  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal server error" }, 500);  // Added more specific error message
  }
})

UserRoute.post('/login', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    if (!body.email || !body.password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 403);
    }

    const isPasswordValid = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: 'Invalid credentials' }, 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (err) {
    console.error(err);
    return c.text('Something went wrong', 500);
  } finally {
    await prisma.$disconnect();
  }
});

export default UserRoute;

UserRoute.get('/profile', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorizationHeader = c.req.header('Authorization');
  if (!authorizationHeader) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authorizationHeader.split(' ')[1]; // Properly extract the token
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // Verify the JWT and extract the payload
    const decoded = await verify(token, c.env.JWT_SECRET) as { id: string };
    const userId = parseInt(decoded.id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const userDetails = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        id: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true
          }
        },
      }
    });

    if (!userDetails) {
      return c.json({ message: 'User not found' }, 404);
    }

    return c.json({ user: userDetails });
  } catch (err) {
    console.error('Error fetching user profile:', { token, err });
    return c.json(
      {
        message: 'Error while fetching user profile',
        error: (err as Error).message,
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

UserRoute.get("/allusers", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const AllUsers = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        posts: true
      }
    });
    return c.json({
      AllUsers
    });
  } catch (err) {
    return c.json({
      message: "something broked",
      err: err
    });
  }
});

// Get Single Post by ID
UserRoute.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const userDetails = await prisma.user.findFirst({
      where: { id: Number(id) },
      select: {
        name: true,
        email: true,
        id: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
          }
        },
      }
    });
    if (!userDetails) {
      return c.json({ message: "Post not found" }, 404);
    }
    return c.json({ userDetails });
  } catch (err) {
    console.error("Error fetching post:", err);
    return c.json({ message: "Error while fetching blog post" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});