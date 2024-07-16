// write comment box component
import { fetchComments } from "@/supabase/comments";
import useSWR from "swr";

const CommentList = ({ postId }) => {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR("comments", () => fetchComments(postId));

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>댓글</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h2>{comment.author}</h2>
          <p>{comment.content}</p>
          <p>{comment.updated_at ? comment.updated_at : comment.created_at}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
