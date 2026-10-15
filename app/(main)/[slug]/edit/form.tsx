"use client"
import { EditPost } from "@/actions/edit-page-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import {type Tables } from "@/lib/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const EditPageForm = ({initialValues, postId } : {initialValues: Pick<Tables<"posts">, "title" | "content" | "image">, postId: string}) => {

  const postImageSchema = postSchema.omit({image: true }).extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      image: initialValues.image || undefined
    }
  })

  const {mutate, error} = useMutation({
    mutationFn: EditPost
  })

  return(
    <div>
      <form  onSubmit={handleSubmit(values => {

        let imageForm = undefined
          if (values.image && typeof values.image !== "string") { 
            imageForm = new FormData()
            imageForm.append('image', values.image[0]) 
          }
        mutate({
        postData:{ 
            title: values.title,
            content: values.content,
            image: imageForm
          }, 
          postId
        })
        
        })} className="flex flex-col w-full mx-auto border-black rounded-2xl border-3 text-left p-6">
        <label htmlFor="title">Add a Title</label>
        <input className="input" type="text" {...register("title")} />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="content">Add content</label>
        <textarea className="input" {...register("content")}></textarea>

        {initialValues.image && <img src={initialValues.image} alt={initialValues.title} />}

        <label htmlFor="image">Change image</label>
        <input className="input" type="file" {...register("image")} />
         {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button">Edit Post</button>
        {error && <ErrorMessage error={error.message} /> }
      </form>
    </div>
  )
}

export default EditPageForm