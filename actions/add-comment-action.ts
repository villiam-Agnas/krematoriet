'use server'

import { createClient } from "@/lib/supabase/serverClient"
import z from "zod"
import { commentSchema } from "./schemas"
import { revalidatePath } from "next/cache"

export const AddCommentAction = async ({commentData, postId} : {commentData: z.infer<typeof commentSchema>, postId: string}) => {
  const supabase = await createClient()
  const parsedData = commentSchema.parse(commentData)
  
  const {data: {user}} = await supabase.auth.getUser()
  if(!user) throw new Error("you need to be logged in to comment")

  await supabase.from("comments").insert({postid: postId, userid: user.id, ...parsedData}).throwOnError()
  revalidatePath("/")
}