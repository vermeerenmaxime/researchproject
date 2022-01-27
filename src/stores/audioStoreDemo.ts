import create from "zustand";

export const useAudioStore = create((set: any) => ({
  // Audio
  audioPlay: false,
  setAudioPlay: (value: boolean) => set({ audioPlay: value }),
  audioStart: false,
  setAudioStart: (value: boolean) => set({ audioStart: value }),
}));
