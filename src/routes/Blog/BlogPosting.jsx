import PostForm from "@/components/PostForm.jsx";
import { createPost } from "@/supabase/posts";

const BlogPosting = () => {
  const handleSubmit = (post) => {
    const { data, error } = createPost(post);

    if (error) {
      console.error("Error: ", error);
    } else {
      console.log("Posts: ", data);
    }
  };

  return (
    <>
      <PostForm onSubmit={handleSubmit} />
    </>
  );
};

export default BlogPosting;
