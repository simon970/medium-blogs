import { Hono } from "hono";
import { Bindings } from "hono/types";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,verify,sign } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@simonpaul496/medium-common";
export const blogsRouter= new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
    }
    >()

blogsRouter.use("/*",async(c,next)=>{
    const token= c.req.header("Authorization");
    const response = await verify(token as string,c.env.JWT_SECRET)
     if(!response){
      c.status(403);
      return c.json({
        msg:"Invalid"
      })
     }
     console.log("hey")
     c.set('userId',response.id as string);
     await next();
    
  })
  
  
  
  blogsRouter.post('/', async (c) => {

   const prisma= new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate())
   const userId = c.get('userId');
   const body = await c.req.json();
   const {success} = createBlogInput.safeParse(body);
   if(!success){
    c.status(411);
    return c.json({
        msg:"Invalid Content"
    })
   }

 const blog = await prisma.post.create({
    data:{
    title:body.title,
    content:body.content,
    authorId: userId 
    }
})
  
return c.json({
    id:blog.id
})

})
  
  blogsRouter.put('/', async (c) => {
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
       }).$extends(withAccelerate())
       const userId = c.get('userId');
       const body = await c.req.json();
       const {success} = updateBlogInput.safeParse(body);

       if(!success){
        c.status(411);
        return c.json({
            msg:"Invalid Content"
        })
       }
    
    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
        title:body.title,
        content:body.content,
        authorId: userId 
        }
    })
      
    return c.json({
        id:blog.id
    })
})

blogsRouter.get('/:bulk', async (c) => {
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
       }).$extends(withAccelerate())
       const userId = c.get('userId');
       const body = await c.req.json();
       try{
        const blogs = await prisma.post.findMany({
            where:{
                id:body.id
            }
        })
    
        return c.json({blogs})

       }catch(e){
        return c.json({
            msg:"Error while fetching the data"
        })
       }
    
  })
  
  blogsRouter.get('/:id', async (c) => {
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
       }).$extends(withAccelerate())
       const userId = c.get('userId');
       const id = await c.req.param("id");
       try{
        const blog = await prisma.post.findFirst({
            where:{
                id:id
            }
        })
    
        return c.json({blog})

       }catch(e){
        return c.json({
            msg:"Error while fetching the data"
        })
       }
    
   
  })

  