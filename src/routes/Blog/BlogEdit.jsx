import PostForm from "@/components/PostForm.jsx";
import { updatePost } from "@/supabase/posts";
import { useParams, useNavigate } from "react-router-dom";
import { readPost } from "@/supabase/posts";
import useSWR from "swr";

const BlogPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: post,
    error,
    isLoading,
    mutate,
  } = useSWR("post/" + id, () => readPost(id));

  const handleSubmit = async (post) => {
    await updatePost(id, post);
    navigate(`/blog/detail/${id}`);
    mutate();
  };
  console.log(post);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <PostForm initialValue={post} onSubmit={handleSubmit} />
    </>
  );
};

export default BlogPosting;
