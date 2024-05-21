import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
});

const useStore = create(import.meta.env.DEV ? devtools(store) : store);

export default useStore;
