// Post.jsx
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../supabase/posts";

const Post = ({ post, isLogin }) => {
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await deletePost(post.id);
    navigate("/blog/list");
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
      <div className="flex w-full justify-end">
        {isLogin && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
