// PostForm.jsx
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import onImagePasted from "@/utils/onImagePasted";

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDEditor
        height={500}
        value={content}
        onChange={setContent}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, setContent);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, setContent);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
