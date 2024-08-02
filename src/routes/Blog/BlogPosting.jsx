import PostForm from "@/components/PostForm.jsx";
import { createPost } from "@/supabase/posts";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

const BlogPosting = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const handleSubmit = (post) => {
    createPost(post);
    navigate("/blog/list");
    mutate("posts");
  };

  return (
    <>
      <PostForm onSubmit={handleSubmit} />
    </>
  );
};

export default BlogPosting;
