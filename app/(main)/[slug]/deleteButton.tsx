'use client'

import { DeletePost } from "@/actions/delet-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({id}: {id:string}) => {

  const {mutate} = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("your post has been deleted")
  })

  return (
    <>
      <button className="button-secondary" onClick={() => mutate(id)}>Delete Post</button>
    </>
  )
}

export default DeleteButton