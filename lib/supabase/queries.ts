import { createClient } from "./browserClient";
import {type QueryData} from '@supabase/supabase-js'

export const getHomePost = async(supabase:ReturnType<typeof createClient>) => {
  return await supabase
    .from("posts")
    .select('title, slug, id, content, image, category, author("id", "username")')
    .order('created_at', {ascending: false})
  
}

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase.from('posts')
    .select('id, title, content, image, category, author("id", "username")')
    .eq('slug', slug)
    .single()
}

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient()
  return await supabase.from('posts').select('title, slug').textSearch('title', searchTerm)
}

export const getPostComments = async (postid: string) => {
  const supabase = createClient()
  const {data, error} = 
    await supabase.from('comments')
    .select('id, content, userid("id", "username")').eq('postid', postid)
    .order('created_at', {ascending: false})
  if(error) console.log("error", error)

  console.log("data", data)
  return data
}

export type HomePostType = QueryData<ReturnType<typeof getHomePost>>

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>

export type SearchResultType = QueryData<ReturnType<typeof searchPosts>>

export type CommentsType = QueryData<ReturnType<typeof getPostComments>>