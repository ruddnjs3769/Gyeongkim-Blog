import { create } from "zustand";
import { devtools } from "zustand/middleware";

const postStore = (set) => ({
  post: { title: "", tags: [], content: "" },
  setPost: (post) => {
    set({ post });
    localStorage.setItem("post", JSON.stringify(post));
  },
  resetPost: () => {
    set({ post: { title: "", tags: [], content: "" } });
    localStorage.removeItem("post");
  },
  loadPostFromLocalStorage: () => {
    const savedPost = JSON.parse(localStorage.getItem("post"));
    if (savedPost) {
      set({ post: savedPost });
    }
  },
});

const usePostStore = create(
  import.meta.env.DEV ? devtools(postStore) : postStore
);

export default usePostStore;
