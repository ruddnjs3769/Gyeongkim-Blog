// write comment box component
import { fetchComments, deleteComment } from "@/supabase/comments";
import useSWR from "swr";
import { useState } from "react";
import EditComment from "@/components/comments/EditComment";

const CommentList = ({ postId }) => {
  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR(`comments/${postId}`, () => fetchComments(postId));

  const [isEditing, setIsEditing] = useState({});
  const [isDeleting, setIsDeleting] = useState({});
  const [deletePassword, setDeletePassword] = useState("");

  const dateFormat = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const toggleEditing = (id) => {
    setIsDeleting((prev) => ({ ...prev, [id]: false }));
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDeleting = (id) => {
    setIsEditing((prev) => ({ ...prev, [id]: false }));
    setIsDeleting((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteCommentHandler = async (id) => {
    if (deletePassword) {
      try {
        await deleteComment(id, deletePassword);
        mutate();
        toggleDeleting(id);
        setDeletePassword("");
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-3/4">
      <h1 className="font-bold">댓글</h1>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="border border-primary p-6">
            <div className="flex justify-between">
              <h2 className="font-bold mb-3">{comment.author}</h2>
              <p className="text-xs">
                {comment.updated_at
                  ? dateFormat(comment.updated_at)
                  : dateFormat(comment.created_at)}
              </p>
            </div>
            <p className="text-sm mb-3">{comment.content}</p>
            <button
              onClick={() => toggleDeleting(comment.id)}
              className="text-xs text-Gray hover:text-darkGray"
            >
              삭제
            </button>
            <button
              className="text-xs text-Gray hover:text-darkGray"
              onClick={() => toggleEditing(comment.id)}
            >
              수정
            </button>
            {isEditing[comment.id] && (
              <EditComment
                commentId={comment.id}
                author={comment.author}
                content={comment.content}
                toggleEditing={toggleEditing}
              />
            )}
            {isDeleting[comment.id] && (
              <div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
                <button
                  onClick={() =>
                    deleteCommentHandler(comment.id, deletePassword)
                  }
                >
                  확인
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentList;
