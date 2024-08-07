import { useParams } from "react-router-dom";
import { readPost } from "@/supabase/posts";
import useSWR from "swr";
import Post from "@/components/Post";
import AddComment from "@/components/comments/AddComment";
import CommentList from "@/components/comments/CommentList";
import { useState, useEffect } from "react";
import { getSession } from "@/supabase/adminLogin";

const PostDetail = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR("post/" + id, () => readPost(id), {
    revalidateOnMount: true,
    revalidateIfStale: false,
  });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };
    checkSession();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Post post={post} isLogin={isLogin} />
      <AddComment postId={id} />
      <CommentList postId={id} />
    </div>
  );
};

export default PostDetail;
