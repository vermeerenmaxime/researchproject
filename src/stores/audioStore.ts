import create from "zustand";
import { persist } from "zustand/middleware";

export const useAudioStore = create((set: any) => ({
  // Audio
  audioUrl: "/audio/memories.mp3",
  setAudioUrl: (value: string) => set({ audioUrl: value }),
  audioPlay: false,
  setAudioPlay: (value: boolean) => set({ audioPlay: value }),
  audioStart: false,
  setAudioStart: (value: boolean) => set({ audioStart: value }),
  audioLength: 0,
  setAudioLength: (value: number) => set({ audioLength: value }),
  audioName: "artists : title",
  setAudioName: (value: string) => set({ audioName: value }),
  audioCurrentTime: 0,
  setAudioCurrentTime: (value: number) => set({ audioCurrentTime: value }),
  addAudioCurrentTime: () =>
    set((state: { audioCurrentTime: number }) => ({
      audioCurrentTime: state.audioCurrentTime + 1,
    })),

  audioGenre: "genre",
  setAudioGenre: (value: string) => set({ audioGenre: value }),

  // Frequencies
  lowFreq: [0, 22],
  setLowFreq: (value: number[]) => set({ lowFreq: value }),
  midFreq: [22, 43],
  setMidFreq: (value: number[]) => set({ midFreq: value }),
  highFreq: [43, 64],
  setHighFreq: (value: number[]) => set({ highFreq: value }),
  kickFreq: [0, 10],
  setKickFreq: (value: number[]) => set({ kickFreq: value }),
}));
