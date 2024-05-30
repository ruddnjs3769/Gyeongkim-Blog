// Post.jsx
import MDEditor from "@uiw/react-md-editor";

const Post = ({ post }) => {
  return (
    <div className="border-y border-gray-300 px-10 py-5">
      <h1>{post.title}</h1>
      <p>{post.tags}</p>
      <MDEditor.Markdown source={post.content} />
    </div>
  );
};

export default Post;
