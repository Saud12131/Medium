import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


export let BlogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: String
    }
}>()


BlogRoute.use("/api/v1/blog/*", async (c, next) => {
    let header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    //@ts-ignore
    let response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
        next();
    } else {
        c.status(403)
        return c.json({
            error: "unauthorized"
        });
    }
})


BlogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let body = c.req.json();

    try {
        let post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId:
            }
        })
    } catch (err) {

        //1:04
    }
})
BlogRoute.get('/:id', (c) => {
    return c.text('Hello Hono!')
})