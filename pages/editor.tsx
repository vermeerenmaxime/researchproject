// @ts-ignore

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import shallow from "zustand/shallow";
import { useStore } from "../src/stores/store";
import { CanvasPlayer } from "../src/components/CanvasPlayer";
import { Menu } from "../src/components/menu/Menu";
import { MenuLink } from "../src/components/menu/Link";
import { PageContent } from "../src/components/PageContent";
import { Scene } from "../src/components/Scene";
import { Footer } from "../src/components/Footer";
import { Main } from "../src/components/Main";
import { useSceneStore } from "../src/stores/sceneStore";

const Editor: NextPage = () => {
  const [likes, addLike, removeLikes] = useStore(
    (state) => [state.likes, state.increaseLike, state.removeAllLikes],
    shallow
  );
  const [
    bloom,
    addBloom,
    removeBloom,
    resetBloom,
    lightIntensity,
    addLightIntensity,
    removeLightIntensity,
    resetLightIntensity,
    setHue,
  ] = useSceneStore(
    (state) => [
      state.bloom,
      state.addBloom,
      state.removeBloom,
      state.resetBloom,
      state.lightIntensity,
      state.addLightIntensity,
      state.removeLightIntensity,
      state.resetLightIntensity,
      state.setHue,
    ],
    shallow
  );

  // useEffect(() => {
  //   console.log(likes);
  // }, [likes]);
  // const likes = useStore();
  return (
    <div>
      <Head>
        <title>3D Audio Visualizer - Editor</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Menu>
          <h1 className="text-xl px-8 py-8 font-semibold ">eVision</h1>
          <div className="grid ">
            <MenuLink>Home</MenuLink>
            <MenuLink>Player</MenuLink>
            <MenuLink>About</MenuLink>
          </div>
        </Menu>

        <PageContent>
          <h1 className="text-xl font-semibold ">3D Web Player</h1>
          <hr className="opacity-10 m-0"></hr>
          <div>
            <h2 className="text-lg font-semibold ">Controls</h2>
            <div className="opacity-70 font-base">
              Play, pause, reset, resolution, ..
            </div>
            <div className="bg-white/90 px-1 py-1 rounded-sm grid grid-flow-col text-slate-700 justify-start gap-4 text-sm">
              <div
                className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"
                onClick={addBloom}
              >
                Bloom {Math.round(bloom * 100) / 100} (+)
              </div>
              <div
                className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"
                onClick={removeBloom}
              >
                Bloom (-)
              </div>
              <div
                className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"
                onClick={addLightIntensity}
              >
                Light {Math.round(lightIntensity * 100) / 100} (+)
              </div>
              <div
                className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"
                onClick={removeLightIntensity}
              >
                Light (-)
              </div>
              <div
                className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"
                onClick={resetLightIntensity}
              >
                Light Reset
              </div>
              <div className="px-3 py-2 hover:bg-black/10 rounded-sm rouded-sm cursor-pointer"></div>

              {/* <div className="px-4 py-2  rouded-sm">hi</div>
              <div className="px-4 py-2  rouded-sm">hi</div> */}
            </div>
            <form>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                onChange={(e) => {
                  setHue(parseInt(e.target.value));
                  console.log(e.target.value);
                }}
              />
            </form>
            likes {likes}
            <button
              className="bg-gray-700 px-8 py-4 rounded-sm"
              onClick={addLike}
            >
              +1
            </button>
            <button
              className="bg-gray-700 px-8 py-4 rounded-sm"
              onClick={removeLikes}
            >
              clear
            </button>
          </div>

          <div className="bg-white/10 aspect-video rounded-sm relative overflow-hidden lg:w-[100%]">
            <CanvasPlayer>
              <Scene></Scene>
            </CanvasPlayer>
          </div>
          <Footer></Footer>
        </PageContent>
      </Main>
    </div>
  );
};

export default Editor;
