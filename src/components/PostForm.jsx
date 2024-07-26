// PostForm.jsx
import { useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import onImagePasted from "@/utils/onImagePasted";
import CreatableSelect from "react-select/creatable";
import usePostStore from "@/zustand/usePostStore";

const PostForm = ({ initialValue, onSubmit }) => {
  const { post, setPost, resetPost, loadPostFromLocalStorage } = usePostStore();
  // const [content, setContent] = useState(initialValue?.content || "");
  // const [tags, setTags] = useState(initialValue?.tags || []);
  // const [title, setTitle] = useState(initialValue?.title || "");
  const { title, tags, content } = post;

  useEffect(() => {
    if (initialValue) {
      setPost({
        title: initialValue.title,
        tags: initialValue.tags,
        content: initialValue.content,
      });
    } else {
      resetPost();
      loadPostFromLocalStorage();
    }
  }, [initialValue, setPost, loadPostFromLocalStorage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, tags, content });
    resetPost();
  };

  const handleTagChange = (selectedOptions) => {
    setPost({ ...post, tags: selectedOptions.map((option) => option.value) });
  };

  const handleTitleChange = (event) => {
    setPost({ ...post, title: event.target.value });
  };

  const handleContentChange = (newContent) => {
    setPost({ ...post, content: newContent });
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
        onChange={handleContentChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, handleContentChange);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, handleContentChange);
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
