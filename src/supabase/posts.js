import supabase from "./index";

export const readPosts = async () => {
  let { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return posts;
};

export const readPost = async (id) => {
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

export const createPost = async (post) => {
  const { data, error } = await supabase.from("posts").insert([post]);
  return { data, error };
};

export const updatePost = async (id, post) => {
  const { error } = await supabase.from("posts").update(post).eq("id", id);
  return { error };
};

export const readTags = async () => {
  const { data, error } = await supabase.from("posts").select("tags");
  if (error) {
    throw error;
  }
  if (data) {
    let tags = data.map((post) => post.tags);
    return tags.flat();
  }
  return data;
};

export const deletePost = async (id) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return { error };
};

export const readUniqueTags = async () => {
  const { data, error } = await supabase.rpc("unique_tags");
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};
