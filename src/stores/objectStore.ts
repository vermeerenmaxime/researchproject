import create from "zustand";
import { persist } from "zustand/middleware";

export const useObjectStore = create(
  persist(
    (set: any) => ({
      // Stars
      stars: 0,
      addStars: () =>
        set((state: { stars: number }) => ({
          stars: state.stars + 10,
        })),
      removeStars: () =>
        set((state: { stars: number }) => ({
          stars: state.stars - 10,
        })),
      resetStars: () => set({ stars: 0 }),
      setStars: (value: number) => set({ stars: value }),
    }),
    { name: "object", getStorage: () => sessionStorage }
  )
);
