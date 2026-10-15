"use client"

import { DeleteCommentAction } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteComment = ({commentId}:{commentId: string}) => {

  const {mutate} = useMutation({
    mutationFn: DeleteCommentAction,
    onSettled: () => toast("Comment was deleted")
  })

  return(
    <div onClick={() => mutate(commentId)} className="button">
      Delete comment
    </div>
  )
}

export default DeleteComment