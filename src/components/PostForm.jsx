// PostForm.jsx
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import onImagePasted from "@/utils/onImagePasted";
import CreatableSelect from "react-select/creatable";

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, tags, content });
    setContent("");
    setTags([]);
    setTitle("");
  };

  const handleTagChange = (selectedOptions) => {
    setTags(selectedOptions.map((option) => option.value));
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add a title input field here */}
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="border w-full px-2 my-2"
        placeholder="Title"
      />
      {/* Add a tag input field here */}
      <CreatableSelect
        isMulti
        isClearable
        isSearchable
        name="tags"
        value={tags.map((t) => ({ label: t, value: t }))}
        onChange={handleTagChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
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
      <button
        type="submit"
        className="bg-primary rounded-xl px-3 py-2 mt-5 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
