import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export let UserRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: String
  }
}>()

UserRoute.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
 
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
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

  const body = await c.req.json();
  try {
   

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    });
    if (!user) {
      return c.json({
        error: "Invalid credentials"
      }, 403);
    }

    //@ts-ignore
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt })

  } catch (err) {
    console.error(err);
    return c.text("Something went wrong", 500);  // More consistent error handling
  }
})
