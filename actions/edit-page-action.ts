'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/lib/supabase/upload-image"
import { fromZonedTime } from "date-fns-tz"

export const EditPost = async({postData, postId} : {postData: z.infer<typeof postSchema>, postId: string}) => {
  const parsedData = postSchema.parse(postData)
  const supabase = await createClient()

  const imageFile = postData.image?.get('image')

  const deleteAt = parsedData.delete_at ? fromZonedTime(parsedData.delete_at, "Europe/Stockholm").toISOString() : null

  const {data: post, error} = await supabase.from("posts").select("*").eq("id", postId).single()
  if (!post) throw new Error("post does not exist")

  let imageUrl;

  if(typeof imageFile !== "undefined") {
      if(!(imageFile instanceof File) && imageFile !== null ) {
      throw Error ("Image is not of valid format!")
    }
    imageUrl = imageFile ? await uploadImage(imageFile) : null
  } else {
    imageUrl = post.image
  }

  const {data :updatedPost} = await supabase.from("posts").update({...parsedData, image: imageUrl, delete_at: deleteAt }).eq("id", postId).select("slug").single().throwOnError()

  revalidatePath("/")
  redirect(`/${updatedPost.slug}`)
}