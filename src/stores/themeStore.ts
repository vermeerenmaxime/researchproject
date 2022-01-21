import create from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set: any) => ({
      themes: ["heart", "space", "car", "moon"],
      theme: "heart",
      setTheme: (value: string) => set({ theme: value }),
      addTheme: (value: string) =>
        set((state: any) => ({
          themes: [...state.themes, value],
        })),
      removeTheme: (value: string) =>
        set((state: any) => ({
          themes: state.themes.filter((theme: string) => theme !== value),
        })),
    }),
    { name: "theme", getStorage: () => localStorage }
  )
);
