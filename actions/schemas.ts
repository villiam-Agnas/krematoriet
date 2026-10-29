import {z} from 'zod'

export const logInSchema = z.object({
  email: z.email("incorrect email pattern"),
  password: z.string().min(5, "password cant be less than 5 characters!")
})

export const signUpSchema = z.object({
  username: z.string().min(5, "username cant be less than 5 characters!"),
  email: z.email("incorrect email pattern"),
  password: z.string().min(5, "password cant be less than 5 characters!")
})

export const postSchema = z.object({
  title: z.string().min(6, "your title must be at least 6 characters long!"),
  content: z.string().optional(),
  delete_at: z.string().optional(),
  category: z.string().optional(),
  image: z.instanceof(FormData).optional()
})

export const commentSchema = z.object({
  content: z.string()
})