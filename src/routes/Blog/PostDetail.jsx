import { useParams, useNavigate } from "react-router-dom";
import { readPost } from "@/supabase/posts";
import useSWR from "swr";
import Post from "@/components/Post";
import TagBar from "@/components/TagBar";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useSWR(id, () => readPost(id));

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <TagBar />
      <Post post={post} />
    </div>
  );
};

export default PostDetail;
