import { readTags } from "@/supabase/posts";
import useSWR from "swr";
import useTagStore from "@/zustand/useTagStore";
import { useNavigate } from "react-router-dom";

const TagBar = () => {
  const navigate = useNavigate();
  const { data: tags, error, isLoading } = useSWR("tags", readTags);
  const setCurrentTag = useTagStore((state) => state.setCurrentTag);

  const handleTagClick = (tag) => {
    setCurrentTag(tag);
    navigate("/blog/list");
  };

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-3">
      <span onClick={() => setCurrentTag("all")}>전체 보기</span>
      {tags.map((tag, index) => (
        <span key={index} onClick={() => handleTagClick(tag)}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagBar;
