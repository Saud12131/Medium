import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signininput, SignIninput, signupinput, Signupinput } from '@saudsayyed/medium-common'

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
  const { success } = signupinput.safeParse(body);
  if(!success){
    c.json({
      message:"incorrect input formate"
    });
  }
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
    c.status(401)
    console.log(err);
    
    return c.json({ err });
  }

})

UserRoute.post('/login', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const { success } = signininput.safeParse(body);
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    });
    if (!user) {
      c.status(403);
      return c.json({
        error: "Invalid credentials"
      });
    }
    //@ts-ignore
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt })
  } catch (err) {
    c.status(401)
    console.log(err);
    return c.text("something broked");
  }

})
