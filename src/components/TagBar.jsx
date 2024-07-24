import { readTags } from "@/supabase/posts";
import useSWR from "swr";
import useStore from "@/zustand/store";

const TagBar = () => {
  const { data: tags, error, isLoading } = useSWR("tags", readTags);
  const setCurrentTag = useStore((state) => state.setCurrentTag);
  const currentTag = useStore((state) => state.currentTag);
  console.log(currentTag);

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-3">
      <span onClick={() => setCurrentTag("all")}>전체 보기</span>
      {tags.map((tag, index) => (
        <span key={index} onClick={() => setCurrentTag(tag)}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagBar;
