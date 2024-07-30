import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { MdComment } from "react-icons/md";
import useSWR from "swr";
import { fetchComments } from "@/supabase/comments";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { title, tags, content, id, like } = post;
  const thumbnail = content.match(/!\[.*\]\((.*)\)/)?.[1];

  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(`comments/${id}`, () => fetchComments(id));

  const commentCount = (() => {
    if (error) return <div>Error: {error}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (comments) {
      return comments.length;
    } else {
      return 0;
    }
  })();

  const plainTextContent = content
    .replace(/!\[.*\]\(.*\)/g, "") // 이미지 제거
    .replace(/\[.*\]\(.*\)/g, "") // 링크 제거
    .replace(/`{1,3}.*?`{1,3}/g, "") // 인라인 코드 제거
    .replace(/#+\s/g, "") // 헤더 제거
    .replace(/[*_~`]/g, "") // 기타 Markdown 문법 제거
    .replace(/&nbsp;/g, ""); // 특수문자 제거
  // 본문에서 마침표 위치 찾기
  const dotIndex = plainTextContent.indexOf(".");

  // 마침표가 있으면 해당 위치까지 슬라이스, 없으면 처음 20자 슬라이스 후 "..." 추가
  const previewContent =
    dotIndex !== -1
      ? dotIndex > 20
        ? plainTextContent.slice(0, 50) + "..."
        : plainTextContent.slice(0, dotIndex + 1)
      : plainTextContent.slice(0, 50) + "...";

  const formattedTitle = title.length > 16 ? title.slice(0, 20) + "..." : title;

  return (
    <div
      className="w-80 border border-primary flex flex-col gap-2 cursor-pointer justify-between items-center"
      onClick={() => navigate(`/blog/detail/${id}`)}
    >
      <img
        src={thumbnail}
        alt="thumbnail"
        className="w-full h-40 object-cover"
      />
      <div className="flex flex-col gap-5 mb-3">
        <h1 className="font-bold px-3">{formattedTitle}</h1>
        <div className="flex px-3">
          {tags.map((tag) => (
            <h2
              key={tag}
              className="rounded-full border border-gray text-center text-xs px-2 py-1 font-bold"
            >
              {tag}
            </h2>
          ))}
        </div>
        <div className="px-3">{previewContent}</div>
      </div>
      <div className="w-full flex justify-between items-center px-3 pb-2">
        <div className="flex gap-2 items-center">
          <FaHeart />
          <span>{like}</span>
        </div>
        <div className="flex gap-2 items-center">
          <MdComment />
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
