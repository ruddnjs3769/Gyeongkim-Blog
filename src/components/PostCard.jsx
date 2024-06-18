import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { title, tags, content, id } = post;
  const thumbnail = content.match(/!\[.*\]\((.*)\)/)?.[1];
  return (
    <div
      className="bg-slate-300 p-5 w-40 h-40"
      onClick={() => navigate(`/blog/detail/${id}`)}
    >
      <img src={thumbnail} alt="thumbnail" />
      <h1>{title}</h1>
      <div>
        {tags.map((tag) => (
          <h2 key={tag}>{tag}</h2>
        ))}
      </div>
      <div>{content.slice(0, 10).replaceAll("#", "")}</div>
    </div>
  );
};

export default PostCard;
