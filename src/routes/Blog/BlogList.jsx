import { readPosts } from "@/supabase/posts";
import PostCard from "@/components/PostCard";
import useSWR from "swr";

const BlogList = () => {
  const { data: posts, error, isLoading } = useSWR("posts", readPosts);
  console.log(posts);
  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex gap-2">
      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
