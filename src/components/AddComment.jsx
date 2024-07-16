import { addComment } from "@/supabase/comments";

const AddComment = ({ postId }) => {
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const { author, password, content } = e.target;
    await addComment(postId, author.value, content.value, password.value);
    author.value = "";
    password.value = "";
    content.value = "";
  };
  return (
    <div>
      <form onSubmit={addCommentHandler}>
        <input type="text" name="author" placeholder="작성자" />
        <input type="password" name="password" placeholder="비밀번호" />
        <textarea name="content" placeholder="댓글내용" />
        <button type="submit">댓글 추가</button>
      </form>
    </div>
  );
};

export default AddComment;
