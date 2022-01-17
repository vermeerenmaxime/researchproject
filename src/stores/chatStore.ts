import create from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create((set: any) => ({
  // Audio
  messages: [{ name: "Mave", message: "Sick!" }],
  setMessages: (value: any) => set({ messages: value }),
  addMessage: (value: any) =>
    set((state: any) => ({
      messages: [...state.messages, value],
    })),
}));
