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
  } = useSWR("comments", () => fetchComments(postId));

  const [isEditing, setIsEditing] = useState(false);

  const dateFormat = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const deleteCommentHandler = async (id) => {
    await deleteComment(id);
  };

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-3/4">
      <h1 className="font-bold">댓글</h1>
      {comments.map((comment) => (
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
            onClick={() => deleteCommentHandler(comment.id)}
            className="text-xs text-Gray hover:text-darkGray"
          >
            삭제
          </button>
          <button
            className="text-xs text-Gray hover:text-darkGray"
            onClick={() => setIsEditing(!isEditing)}
          >
            수정
          </button>
          {isEditing && (
            <EditComment
              commentId={comment.id}
              author={comment.author}
              content={comment.content}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
