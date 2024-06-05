import supabase from "./index";

export const fetchPosts = async () => {
  let { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return posts;
};

export const fetchPost = async (id) => {
  let { data: response, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return response; // response is an object // { status: number, statusText: string }
};
