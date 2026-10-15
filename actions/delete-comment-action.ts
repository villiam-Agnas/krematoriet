'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"


export const DeleteCommentAction = async (commentId: string) => {
  const supabase = await createClient()

  const {error} = await supabase.from("comments").delete().eq("id", commentId)
  if(error) console.log(error)

  revalidatePath("/")
}