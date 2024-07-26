import { readPosts } from "@/supabase/posts";
import PostCard from "@/components/PostCard";
import useSWR from "swr";
import useStore from "@/zustand/store";

const BlogList = () => {
  const currentTag = useStore((state) => state.currentTag);

  const { data: posts, error, isLoading } = useSWR("posts", readPosts);

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredByTagPosts = posts?.filter((post) => {
    if (currentTag === "all") {
      return post;
    } else {
      return post.tags.includes(currentTag);
    }
  });

  console.log(filteredByTagPosts);
  const sortedPosts = filteredByTagPosts?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="flex gap-2">
      {sortedPosts &&
        sortedPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default BlogList;
