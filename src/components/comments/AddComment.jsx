import { addComment } from "@/supabase/comments";
import { useSWRConfig } from "swr";

const AddComment = ({ postId }) => {
  const { mutate } = useSWRConfig();

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const { author, password, content } = e.target;
    await addComment(postId, author.value, content.value, password.value);
    mutate(`comments/${postId}`);
    author.value = "";
    password.value = "";
    content.value = "";
  };
  return (
    <div className="border border-primary w-3/4 p-3">
      <form onSubmit={addCommentHandler} className="block">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            name="author"
            placeholder="작성자"
            className="border-b border-b-darkGray"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="border-b border-b-darkGray"
          />
        </div>
        <div className="flex justify-between items-end">
          <textarea
            name="content"
            placeholder="댓글내용"
            className="border-y border-y-darkGray w-3/4 h-24"
          />
          <button
            type="submit"
            className="rounded-md bg-Gray text-white p-2 h-1/2"
          >
            댓글 추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
