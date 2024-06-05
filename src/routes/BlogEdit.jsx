import PostForm from "@/components/PostForm.jsx";
import supabase from "../supabase";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost } from "@/supabase/posts";
import useSWR from "swr";

const BlogPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, error, isLoading } = useSWR(id, fetchPost);

  const handleSubmit = async (post) => {
    const { error } = await supabase.from("posts").update(post).eq("id", id);
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
