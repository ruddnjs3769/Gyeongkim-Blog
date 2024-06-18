import { readTags } from "@/supabase/posts";
import useSWR from "swr";

const TagBar = () => {
  const { data: tags, error, isLoading } = useSWR("tags", readTags);

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(tags);
  tags;

  return (
    <div>
      {/* {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))} */}
    </div>
  );
};

export default TagBar;
