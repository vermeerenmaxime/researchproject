import create from "zustand";
import { persist } from "zustand/middleware";

export const useSceneStore = create(
  persist(
    (set: any) => ({
      bloom: 0.1,
      addBloom: () =>
        set((state: { bloom: number }) => ({
          bloom: state.bloom < 2 ? state.bloom + 0.1 : state.bloom,
        })),
      removeBloom: () =>
        set((state: { bloom: number }) => ({
          bloom: state.bloom > 0 ? state.bloom - 0.1 : state.bloom,
        })),
      resetBloom: () => set({ bloom: 0.1 }),
      setBloom: (value: number) => set({ bloom: value }),

      // Light
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
      setLightIntensity: (value: number) => set({ lightIntensity: value }),

      // Hue
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

      // SceneSpeed
      sceneSpeed: 1,
      addSceneSpeed: () =>
        set((state: { sceneSpeed: number }) => ({
          sceneSpeed: state.sceneSpeed + 1,
        })),
      removeSceneSpeed: () =>
        set((state: { sceneSpeed: number }) => ({
          sceneSpeed: state.sceneSpeed - 1,
        })),
      resetSceneSpeed: () => set({ sceneSpeed: 1 }),
      setSceneSpeed: (value: number) => set({ sceneSpeed: value }),

      lightColors: [
        "blue",
        "red",
        "orange",
        "purple",
        "green",
        "yellow",
        "white",
      ],
      pointLight1: "blue",
      setPointLight1: (value: string) => set({ pointLight1: value }),
      pointLight2: "red",
      setPointLight2: (value: string) => set({ pointLight2: value }),
    }),
    { name: "scene", getStorage: () => sessionStorage }
  )
);

export const useEnvironmentStore = create((set: any) => ({
  // Background
  environmentBackgroundUrl: "/spaces/studio_small_03_4k.pic",
  setEnvironmentBackgroundUrl: (value: string) =>
    set({ environmentBackgroundUrl: value }),
}));
