import supabase from "./index";

export const fetchPosts = async () => {
  let { data: posts, error } = await supabase.from("posts").select("*");
  console.log(posts);
  if (error) {
    throw error;
  }
  return posts;
};
