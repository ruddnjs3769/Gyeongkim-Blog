import { updateComment, validateUpdatedComment } from "@/supabase/comments";
import { useState } from "react";

const EditComment = ({ commentId, author, content, setIsEditing }) => {
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [password, setPassword] = useState("");
  const [editedContent, setEditedContent] = useState(content);

  const EditCommentHandler = async (e) => {
    e.preventDefault();
    const result = {
      commentId,
      newAuthor: editedAuthor,
      newContent: editedContent,
      inputPassword: password,
    };
    const isUpdated = await updateComment(result);
    if (isUpdated) {
      await validateUpdatedComment(commentId, editedAuthor, editedContent);
    }
    setIsEditing(false);
  };
  console.log(editedAuthor);
  console.log(editedContent);
  return (
    <div className="mt-5">
      <form onSubmit={EditCommentHandler}>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            name="author"
            placeholder="작성자"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            className="border-b border-b-darkGray"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-b-darkGray"
          />
        </div>
        <div className="flex justify-between items-end">
          <textarea
            name="content"
            placeholder="댓글내용"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border-y border-y-darkGray w-3/4 h-24"
          />
          <button
            type="submit"
            className="rounded-md bg-Gray text-white p-2 h-1/2"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
