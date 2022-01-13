import create from "zustand";
import { persist } from "zustand/middleware";

export const useSpeedStore = create(
  persist(
    (set: any) => ({
      // Stars
      cameraSpeed: 1,
      addStars: () =>
        set((state: { stars: number }) => ({
          stars: state.stars + 1,
        })),
      removeStars: () =>
        set((state: { stars: number }) => ({
          stars: state.stars - 1,
        })),
      resetStars: () => set({ stars: 1 }),
      setStars: (value: number) => set({ stars: value }),
    }),
    { name: "scene", getStorage: () => sessionStorage }
  )
);
