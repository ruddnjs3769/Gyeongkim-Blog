import supabase from "@/supabase";

export const addComment = async (postId, author, content, password) => {
  const { data, error } = await supabase
    .from("comment")
    .insert([{ postId, author, content, password, created_at: new Date() }]);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from("comment")
    .select("id, postId, author, content, created_at, updated_at")
    .eq("postId", postId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

// 댓글 수정
export const updateComment = async (commentId, inputPassword, newContent) => {
  const { error } = await supabase
    .from("comment")
    .update({ content: newContent, updated_at: new Date() })
    .match({ id: commentId, password: inputPassword });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

// 댓글 삭제
export const deleteComment = async (commentId, inputPassword) => {
  const { error } = await supabase
    .from("comment")
    .delete()
    .match({ id: commentId, password: inputPassword });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};
