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

      // Size
      starSize: 4,
      addStarSize: () =>
        set((state: { starSize: number }) => ({
          starSize: state.starSize + 1,
        })),
      removeStarSize: () =>
        set((state: { starSize: number }) => ({
          starSize: state.starSize - 1,
        })),
      resetStarSize: () => set({ starSize: 1 }),
      setStarSize: (value: number) => set({ starSize: value }),

      // mainObject
      mainObjectPosition: [0, 0, 0],
      setMainObjectPosition: (value: number[]) =>
        set({ mainObjectPosition: value }),
    }),
    { name: "object", getStorage: () => sessionStorage }
  )
);
