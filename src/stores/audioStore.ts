import create from "zustand";
import { persist } from "zustand/middleware";

export const useAudioStore = create((set: any) => ({
  // Audio
  audioUrl: "/audio/memories.mp3",
  setAudioUrl: (value: string) => set({ audioUrl: value }),
}));
