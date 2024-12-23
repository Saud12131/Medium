import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createblog, updateblog } from '@saudsayyed/medium-common'
//1:26

export let BlogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

BlogRoute.use("/*", async (c, next) => {
    let authHeader = c.req.header("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
        return c.json({ message: "Unauthorized: Missing or invalid token" }, 401);
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        c.set("userId", user.id as string);
        await next();
    } catch (err) {
        console.error("JWT Error:", err);
        return c.json({ message: "Unauthorized: Invalid or expired token" }, 401);
    }
});


BlogRoute.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    let body = await c.req.json();
    const userId = c.get("userId");

    const { success } = createblog.safeParse(body);
    if (!success) {
        c.json({
            message: "incorrect input formate"
        });
    }
    try {
        let post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(userId),
            },
        });

        return c.json({
            id: post.id,
        });
    } catch (err) {
        console.error("Error creating post:", err);
        return c.json({
            error: "Error while creating post",
            details: err,
        }, 500);
    }
});


BlogRoute.get('/allpost', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany();
    return c.json({
        posts
    })
})

BlogRoute.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    let body = await c.req.json();
    const { success } = updateblog.safeParse(body);
    if (!success) {
        c.json({
            message: "incorrect input formate"
        });
    }
    try {
        let post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,

            }
        });

        return c.json({
            id: post.id,
        })
    } catch (err) {
        c.json({
            err
        });
    }
});


BlogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let id = c.req.param("id");

    try {
        let post = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        });
        return c.json({
            post
        })

    } catch (err) {
        c.status(411);
        c.json({
            message: "error while fetching blog post",
            err

        });
    }
});

