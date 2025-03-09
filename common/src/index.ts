import zod from "zod";

export const signupInput = zod.object({
    email:zod.string().email(),
    password:zod.string(),
    name:zod.string()
})

export type SignupInput = zod.infer<typeof signupInput>


export const signinInput = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

export type SigninInput = zod.infer<typeof signinInput>

export const createBlogInput = zod.object({
    title :zod.string(),
    content:zod.string()
})

export type createBlogInput = zod.infer<typeof createBlogInput>

export const updateBlogInput = zod.object({
    title:zod.string(),
    content:zod.string(),
    id:zod.string()
})

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>