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
app.use('*', cors({
  origin: '*', // Adjust as needed for security
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', async (c) => {

  return c.text('Hello Hono!')
})



app.route("/api/v1/user", UserRoute);
app.route("/api/v1/post", BlogRoute);


export default app
