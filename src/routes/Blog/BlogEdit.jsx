import PostForm from "@/components/PostForm.jsx";
import { updatePost } from "@/supabase/posts";
import { useParams, useNavigate } from "react-router-dom";
import { readPost } from "@/supabase/posts";
import useSWR from "swr";

const BlogPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, error, isLoading } = useSWR(id, readPost);

  const handleSubmit = async (post) => {
    const { error } = updatePost(id, post);
    if (error) {
      console.error("Error: ", error);
    } else {
      alert("수정이 완료되었습니다.");
      navigate(`/blog/${id}`);
    }
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
