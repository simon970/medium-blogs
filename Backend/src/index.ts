import { Hono } from 'hono'

import { Bindings } from 'hono/types'
import { decode,verify,sign } from 'hono/jwt'
import { jwk } from 'hono/jwk'
import { userRouter } from './routes/user'
import { blogsRouter } from './routes/blogs'
import {cors} from "hono/cors"

const app = new Hono<{
Bindings:{
  DATABASE_URL:string,
  JWT_SECRET:string
},
Variables:{
  userId:string
}
}
>()

app.use("/*",cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogsRouter);



export default app
