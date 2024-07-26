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
export const updateComment = async ({
  commentId,
  newAuthor,
  newContent,
  inputPassword,
}) => {
  const { error } = await supabase
    .from("comment")
    .update({ author: newAuthor, content: newContent, updated_at: new Date() })
    .match({ id: commentId, password: inputPassword });
  if (error) {
    console.error(error);
    alert("댓글 수정 오류 발생");
    return false;
  } else {
    return true;
  }
};

// 수정된 댓글 유효성 검사
export const validateUpdatedComment = async (
  commentId,
  expectedAuthor,
  expectedContent
) => {
  const { data: updatedComments, error } = await supabase
    .from("comment")
    .select("*")
    .eq("id", commentId);

  if (error) {
    console.error(error);
    alert("댓글 조회 오류 발생");
    return false;
  }

  if (
    !updatedComments.length ||
    updatedComments[0].author !== expectedAuthor ||
    updatedComments[0].content !== expectedContent
  ) {
    alert("댓글 수정이 정확히 반영되지 않았습니다. 비밀번호를 확인하세요.");
    return false;
  }

  alert("댓글 수정이 정확히 반영되었습니다.");
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
    alert("댓글 삭제 오류 발생");
    return false;
  } else {
    alert("댓글이 삭제되었습니다.");
    return true;
  }
};

// 댓글 개수 조회
export const countComments = async (postId) => {
  const { error, count } = await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching comment count:", error);
    return null;
  }

  return count;
};
