import create from "zustand";
import { persist } from "zustand/middleware";

export const useSceneStore = create(
  persist(
    (set: any) => ({
      bloom: 0.1,
      addBloom: () =>
        set((state: { bloom: number }) => ({
          bloom: state.bloom + 0.1,
        })),
      removeBloom: () =>
        set((state: { bloom: number }) => ({
          bloom: state.bloom - 0.1,
        })),
      resetBloom: () => set({ bloom: 0.1 }),
      setBloom: (value: number) => set({ bloom: value }),
      lightIntensity: 0,
      addLightIntensity: () =>
        set((state: { lightIntensity: number }) => ({
          lightIntensity: state.lightIntensity + 0.1,
        })),
      removeLightIntensity: () =>
        set((state: { lightIntensity: number }) => ({
          lightIntensity: state.lightIntensity - 0.1,
        })),
      resetLightIntensity: () => set({ lightIntensity: 0 }),
      hue: 0,
      addHue: () =>
        set((state: { hue: number }) => ({
          hue: state.hue + 1,
        })),
      removeHue: () =>
        set((state: { hue: number }) => ({
          hue: state.hue - 1,
        })),
      resetHue: () => set({ hue: 0 }),
      setHue: (value: number) => set({ hue: value }),
    }),
    { name: "scene", getStorage: () => sessionStorage }
  )
);
