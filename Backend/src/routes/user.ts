import { Hono } from "hono";
import { Bindings } from "hono/types";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,verify,sign } from 'hono/jwt'
import { signinInput,signupInput } from "@simonpaul496/medium-common";

export const userRouter= new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
    }
    >()

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  
  const body = await c.req.json();

  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        msg:"Invalid Inputs"
    })
  }
  
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
  userRouter.post('/signin', async(c) => {
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