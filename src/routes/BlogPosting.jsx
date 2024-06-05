import PostForm from "@/components/PostForm.jsx";
import supabase from "../supabase";

const BlogPosting = () => {
  const handleSubmit = async (post) => {
    const { data, error } = await supabase.from("posts").insert([post]);

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
