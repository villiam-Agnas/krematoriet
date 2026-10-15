import { getPostComments, getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import DeleteButton from "./deleteButton";
import Link from "next/link";
import Comments from "./comments";
import AddComment from "./addComment";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getSinglePost(slug);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;

  return (
    <div className="px-4 sm:px-6 py-6">
      {data && (
        <div
          className="border-charcoal border-4 rounded-2xl mx-auto
        w-full max-w-3xl mt-2 p-4 sm:p-6 md:p-8
        flex flex-col gap-5"
        >
          <h1 className="heading-secondary break-words">{data.title}</h1>

          {data.image && (
            <div className="w-full max-w-md aspect-square mx-auto rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {data.content && (
            <p className="whitespace-pre-wrap break-words">{data.content}</p>
          )}

          <p>Created by {data.author.username}</p>

          {isAuthor && (
            <div className="flex flex-wrap gap-3 justify-between">
              <Link className="button-secondary" href={`/${slug}/edit`}>
                Edit
              </Link>
              <DeleteButton id={data.id} />
            </div>
          )}

          <Comments
            postid={data.id}
            isAuthor={isAuthor}
            userId={user ? user.id : null}
          />

          {user && <AddComment postId={data.id} />}
        </div>
      )}
    </div>
  );
};

export default PostPage;
