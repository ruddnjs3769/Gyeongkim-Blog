// Post.jsx
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { deletePost, updateLikes } from "../supabase/posts";
import { useSWRConfig } from "swr";

const Post = ({ post, isLogin }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const handleDeletePost = async () => {
    await deletePost(post.id);
    navigate("/blog/list");
  };

  const handleLike = () => {
    const likedDate = localStorage.getItem(`liked_${post.id}`);
    const today = new Date().toLocaleDateString();

    if (likedDate === today) {
      // 좋아요 취소 로직
      localStorage.removeItem(`liked_${post.id}`);
      // 좋아요 수 감소 로직 추가
      updateLikes(post.id, post.like - 1);
      mutate("post/" + post.id, { ...post, like: post.like - 1 }, false);
    } else {
      // 좋아요 로직
      localStorage.setItem(`liked_${post.id}`, today);
      // 좋아요 수 증가 로직 추가
      updateLikes(post.id, post.like + 1);
      mutate("post/" + post.id, { ...post, like: post.like + 1 }, false);
    }
  };

  return (
    <div className="border border-gray-300 px-10 py-5 my-10 w-full flex flex-col gap-5">
      <h1 className="text-3xl font-bold border-b-2 pb-5 pt-5 mb-3">
        {post.title}
      </h1>
      <div className="flex gap-2 mb-10 pb-2 border-b-2">
        {post.tags?.map((tag, index) => (
          <p
            key={index}
            className="bg-coolBlue opacity-40 rounded-2xl flex justify-center items-center w-20 h-8 text-sm font-semibold text-white my-2"
          >
            {tag}
          </p>
        ))}
      </div>
      <MDEditor.Markdown source={post.content} />
      <div className="flex w-full justify-between">
        <div>
          <span className="text-Gray text-sm">
            작성일: {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <div>
          <button
            className="text-white text-base border border-primary rounded-lg p-2 hover:bg-primary"
            onClick={handleLike}
          >
            👍
          </button>
          <span className="text-Gray text-sm ml-2">{post.like}</span>
        </div>
        {isLogin && (
          <div className="flex gap-3">
            <button
              className="hover:underline text-Gray text-sm"
              onClick={() => navigate(`/blog/edit/${post.id}`)}
            >
              수정하기
            </button>
            <button
              className="hover:underline text-Gray text-sm"
              onClick={handleDeletePost}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
