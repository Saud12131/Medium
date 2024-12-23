import { Hono } from 'hono'
import { UserRoute } from './routes/user'
import { BlogRoute } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: String
  }
}>()
app.use('*', cors())

app.get('/', async (c) => {

  return c.text('Hello Hono!')
})



app.route("/api/v1/user", UserRoute);
app.route("/api/v1/post", BlogRoute);


export default app
