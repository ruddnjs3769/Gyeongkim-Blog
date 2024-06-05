// Post.jsx
import MDEditor from "@uiw/react-md-editor";

const Post = ({ post }) => {
  console.log(post.tags);
  return (
    <div className="border border-gray-300 px-10 py-5 my-10 w-full flex flex-col gap-5">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex gap-2 mb-5">
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
    </div>
  );
};

export default Post;
