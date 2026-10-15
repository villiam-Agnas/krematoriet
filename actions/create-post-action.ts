'use server'

import { fromZonedTime } from "date-fns-tz"
import { slugify } from "@/lib/supabase/slugify"
import { postSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import z from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadImage } from "@/lib/supabase/upload-image"

export const CreatePost = async (postdata: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.parse(postdata)
  const slug = slugify(parsedData.title)

  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()

  if(!user) throw new Error("Unauthorized access!")

  const imageFile = postdata.image?.get('image')  
  if(!(imageFile instanceof File) && imageFile !== null && imageFile !== "undefined" ) {
    throw Error ("Image is not of valid format!")
  }

  const imageUrl = (imageFile && imageFile !== "undefined") ? await uploadImage(imageFile) : null

  const deleteAt = parsedData.delete_at ? fromZonedTime(parsedData.delete_at, "Europe/Stockholm").toISOString() : null
  
  const {data, error} = await supabase.from("posts").insert({
    ...parsedData,
    delete_at: deleteAt,
    slug: slug, 
    image: imageUrl,
    author: user.id
  })

  if(error) console.log(error)


  revalidatePath("/")
  redirect(`/${slug}`)

}