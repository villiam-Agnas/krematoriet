"use client";

import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import Image from "next/image";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  return (
    <div className="">
      {posts.map((post) => (
        <Link
          key={post.id}
          className="border-4 rounded-2xl mb-4 border-forest p-4 flex flex-col gap-3 w-full max-w-[80%] min-h-48 mx-auto sm:flex-row sm:gap-5 sm:p-5"
          href={`/${post.slug}`}
        >
          <div className="relative w-28 h-28 shrink-0 sm:w-40 sm:h-40">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            {post.category && <p className="text-m uppercase ">{post.category}</p>}
            <h3 className="font-bold text-2xl text-mutedTeal">{post.title}</h3>

            <p className="mt-1">{post.content}</p>

            <p className="text-right mt-auto pt-2">
              Posted by {post.author.username}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePosts;
