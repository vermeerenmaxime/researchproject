import create from "zustand";

export const useEditorStore = create((set: any) => ({
  // Audio
  mode: "edit",
  setMode: (value: string) => set({ mode: value }),
}));
