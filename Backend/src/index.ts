import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Bindings } from 'hono/types'
import { decode,verify,sign } from 'hono/jwt'
import { jwk } from 'hono/jwk'

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

app.use("/api/v1/blog/*",async(c,next)=>{
  const token= c.req.header("Authorization");
  const response = await verify(token as string,c.env.JWT_SECRET)
   if(!response){
    c.status(403);
    return c.json({
      msg:"Invalid"
    })
   }
   c.set('userId',response.id as string);
   await next();
  
})

app.post('/api/v1/user/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())


const body = await c.req.json();

const user =await prisma.user.create({
  data:{
    email:body.email,
    password:body.password,
    name:body.name
  }
})
const token= await sign({id:user.id} ,c.env.JWT_SECRET)
  return c.json({
    jwt:token
  })
})
app.post('/api/v1/user/signin', async(c) => {
  const prisma= new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,

  }).$extends(withAccelerate())

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where:{email:body.email}})

    if(!user){
      return c.json({
        msg:"User Not Found"
      })
    }else{
      const token= await sign({id:user.id} ,c.env.JWT_SECRET)
  return c.json({
    jwt:token
  })
  }
})

app.post('/api/v1/blog', (c) => {
  console.log(c.get('userId'))
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:bulk', (c) => {
  return c.text('Hello Hono!')
})


export default app
