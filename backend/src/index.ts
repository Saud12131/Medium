import { Hono } from 'hono'
import { UserRoute } from './routes/user'
import { BlogRoute } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: String
  }
}>()

app.get('/', async (c) => {

  return c.text('Hello Hono!')
})


// app.use("/api/v1/blog/*", async (c, next) => {
//   let header = c.req.header("Authorization") || "";
//   const token = header.split(" ")[1];
//   //@ts-ignore
//   let response = await verify(token, c.env.JWT_SECRET);
//   if (response.id) {
//     next();
//   } else {
//     c.status(403)
//     return c.json({
//       error: "unauthorized"
//     });
//   }
// })

app.route("/api/v1/user", UserRoute);
app.route("/api/v1/post", BlogRoute);


export default app
