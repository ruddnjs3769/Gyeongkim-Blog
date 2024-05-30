import { fetchPosts } from "../supabase/posts";
import Post from "@/components/Post";
import useSWR from "swr";

const BlogList = () => {
  const { data: posts, error, isLoading } = useSWR("posts", fetchPosts);
  console.log(posts);
  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
