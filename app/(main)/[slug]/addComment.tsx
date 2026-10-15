"use client"

import { AddCommentAction } from "@/actions/add-comment-action"
import { commentSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddComment = ({postId}: {postId:string}) => {

  const {register, handleSubmit, reset, formState:{errors}} = useForm({
    resolver: zodResolver(commentSchema)
  })

  const {mutate, error} = useMutation({
    mutationFn: AddCommentAction,
    onSuccess: () => reset(),
    onSettled: () => toast("Added comment")
  })

  return(
    <form className="flex flex-col gap-3 border-2 border-charcoal rounded-xl p-4" onSubmit={handleSubmit(values => mutate({commentData: {content: values.content}, postId}))}>
      <label htmlFor="content" className="font-semibold">Add a comment</label>
      <textarea className="w-full min-h-24 rounded-lg border-2 border-charcoal/30 p-3 bg-transparent" {...register("content")} placeholder="Add a comment....." />
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <div className="flex justify-end">
        <button className="button-secondary">Add comment</button>
      </div>  
      {error && <ErrorMessage error={error.message} />}
    </form>
  )
}

export default AddComment