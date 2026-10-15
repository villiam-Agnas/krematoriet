import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./deleteComment";

const Comments = async ({
  postid,
  isAuthor,
  userId,
}: {
  postid: string;
  isAuthor: boolean;
  userId: string | null;
}) => {
  const comments = await getPostComments(postid);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div
            className="border-2 border-charcoal rounded-xl p-4 flex flex-col gap-2"
            key={comment.id}
          >
            <p className="wrap-break-words whitespace-pre-wrap">
              {comment.content}
            </p>
            <div className="flex justify-between items-center gap-3 border-t border-charcoal/30 pt-2">
              <p className="text-sm opacity-70">{comment.userid.username}</p>
              {(isAuthor || userId === comment.userid.id) && (
                <DeleteComment commentId={comment.id} />
              )}
            </div>
          </div>
        ))}
      {(!comments || comments.length === 0) && (
        <p className="text-sm opacity-60">No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;
