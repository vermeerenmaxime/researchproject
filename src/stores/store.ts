import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set: any) => ({
      likes: 0,
      increaseLike: () =>
        set((state: { likes: number }) => ({ likes: state.likes + 1 })),
      removeAllLikes: () => set({ likes: 0 }),
    }),
    { name: "test", getStorage: () => localStorage }
  )
);
