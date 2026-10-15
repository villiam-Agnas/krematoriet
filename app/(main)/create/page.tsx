"use client";

import { CreatePost } from "@/actions/create-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const CreatePostPage = () => {
  const postImageSchema = postSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: CreatePost,
  });

  return (
    <div className="w-lg mx-auto">
      <h1 className="heading">Create a post</h1>
      <form
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          if (values.image) imageForm.append("image", values.image[0]);
          mutate({
            title: values.title,
            content: values.content,
            delete_at: values.delete_at,
            image: imageForm,
          });
        })}
        className="flex flex-col w-full mx-auto border-black rounded-2xl border-3 text-left p-6"
      >
        <label htmlFor="title">Add a Title</label>
        <input className="input" type="text" {...register("title")} />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="content">Add content</label>
        <textarea className="input" {...register("content")}></textarea>

        <label htmlFor="image">Add an image</label>
        <input className="input" multiple type="file" {...register("image")} />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <label htmlFor="delete_at">Delete post at</label>
        <input
          className="input"
          type="datetime-local"
          {...register("delete_at")}
        />

        <button className="button">Create Post</button>

        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default CreatePostPage;