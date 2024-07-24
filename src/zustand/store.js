import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  currentTag: "all",
  setCurrentTag: (tag) => set({ currentTag: tag }),
});

const useStore = create(import.meta.env.DEV ? devtools(store) : store);

export default useStore;
