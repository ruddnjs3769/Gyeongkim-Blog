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
  const { data, error } = await supabase.from("posts").insert([post]).select();

  if (data) {
    alert("성공적으로 게시물이 작성되었습니다.");
  }
  if (error) {
    console.error(error);
    alert("게시물 작성 중 오류가 발생했습니다.");
  }
};

export const updatePost = async (id, post) => {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select();
  if (data) {
    alert("성공적으로 게시물이 수정되었습니다.");
  }
  if (error) {
    console.error(error);
    alert("게시물 수정 중 오류가 발생했습니다.");
  }
};

export const deletePost = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select();
  if (data) {
    alert("성공적으로 게시물이 삭제되었습니다.");
  }
  if (error) {
    console.error(error);
    alert("게시물 삭제 중 오류가 발생했습니다.");
  }
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

export const readUniqueTags = async () => {
  const { data, error } = await supabase.rpc("unique_tags");
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

export const updateLikes = async (id, like) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ like: like })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    alert("좋아요 중 오류가 발생했습니다.");
  }
  return data;
};
