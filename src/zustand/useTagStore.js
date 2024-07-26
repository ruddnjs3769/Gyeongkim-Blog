import { create } from "zustand";
import { devtools } from "zustand/middleware";

const tagStore = (set) => ({
  currentTag: "all",
  setCurrentTag: (tag) => set({ currentTag: tag }),
});

const useTagStore = create(import.meta.env.DEV ? devtools(tagStore) : tagStore);

export default useTagStore;
