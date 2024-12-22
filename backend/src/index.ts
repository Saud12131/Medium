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

app.route("/api/v1/user",UserRoute);
app.route("/api/v1/blog",BlogRoute);


export default app
