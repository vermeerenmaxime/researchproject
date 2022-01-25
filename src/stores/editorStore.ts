import create from "zustand";

export const useEditorStore = create((set: any) => ({
  // Audio
  mode: "edit",
  setMode: (value: string) => set({ mode: value }),
  fullscreen: false,
  setFullscreen: (value: boolean) => set({ fullscreen: value }),
}));
