// @ts-ignore

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import shallow from "zustand/shallow";
import { useStore } from "../src/stores/store";
import { CanvasPlayer } from "../src/components/CanvasPlayer";
import { Menu } from "../src/components/menu/Menu";
import { MenuLink } from "../src/components/menu/Link";
import { PageContent } from "../src/components/PageContent";
import { Scene } from "../src/components/Scene";
import { Footer } from "../src/components/Footer";
import { Main } from "../src/components/Main";
import { useEnvironmentStore, useSceneStore } from "../src/stores/sceneStore";
import { useObjectStore } from "../src/stores/objectStore";
import { useAudioStore } from "../src/stores/audioStore";

const Control = ({
  add,
  remove,
  reset,
  icon,
  value,
  name = "name",
  props,
}: any) => {
  return (
    <div className="flex align-center" {...props}>
      <div className="rounded-sm rouded-sm cursor-pointer text-center grid grid-flow-col gap-1 justify-start align-center relative group ">
        {remove ? (
          <div
            className="hover:bg-black/10 p-2 flex justify-center items-center"
            onClick={remove}
          >
            -
          </div>
        ) : (
          <></>
        )}
        <div
          className="grid  px-3 py-2 hover:bg-black/10 rounded-sm justify-center items-center cursor-pointer"
          onClick={reset}
        >
          {icon}
          {value ? <p>{Math.round(value * 100) / 100}</p> : <></>}
        </div>
        {add ? (
          <div
            className="hover:bg-black/10 p-2 flex justify-center items-center"
            onClick={add}
          >
            +
          </div>
        ) : (
          <></>
        )}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full text-xs capitalize px-2 py-1 opacity-0 transition-all group-hover:opacity-100">
          {name}
        </div>
      </div>
    </div>
  );
};
const Setting = ({
  actions = { reset: () => {} },
  value,
  name,
  props,
  children,
}: any) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex align-center relative" {...props}>
      <div
        className="rounded-sm rouded-sm text-center grid grid-flow-col gap-1 justify-start align-center  group "
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="grid  px-3 py-2 hover:bg-black/10 rounded-sm justify-center items-center cursor-pointer"
          onClick={actions.top}
        >
          {children}
        </div>

        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-sm text-xs capitalize px-3 py-2 opacity-0 transition-all hidden group-hover:grid group-hover:opacity-100 gap-2">
          <b>
            {name} {value ? <>{Math.round(value * 100) / 100}</> : <></>}
          </b>
          {Object.keys(actions)
            .filter((action) => action != "top")
            .map((action: any, i) => (
              <div
                key={i}
                className="flex align-center justify-between space-x-4"
              >
                <p>{action}</p>

                <div className="flex">
                  {actions[action].value ? (
                    <input
                      type="number"
                      value={actions[action].value}
                      onChange={(e) =>
                        actions[action].set(parseInt(e.target.value))
                      }
                      className="border-b-[1px] h-4 outline-none w-12 border-black/20 text-center mr-2"
                    ></input>
                  ) : (
                    <></>
                  )}
                  {actions[action].remove ? (
                    <svg
                      onClick={actions[action].remove}
                      className="w-4 h-4 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  ) : (
                    <></>
                  )}
                  {actions[action].add ? (
                    <svg
                      onClick={actions[action].add}
                      className="w-4 h-4 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const Editor: NextPage = () => {
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

    sceneSpeed,
    addSceneSpeed,
    removeSceneSpeed,
    setSceneSpeed,
    resetSceneSpeed,
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

      state.sceneSpeed,
      state.addSceneSpeed,
      state.removeSceneSpeed,
      state.setSceneSpeed,
      state.resetSceneSpeed,
    ],
    shallow
  );

  const [stars, addStars, removeStars, setStars, resetStars] = useObjectStore(
    (state: any) => [
      state.stars,
      state.addStars,
      state.removeStars,
      state.setStars,
      state.resetStars,
    ],
    shallow
  );
  const [audioUrl, setAudioUrl] = useAudioStore(
    (state: any) => [state.audioUrl, state.setAudioUrl],
    shallow
  );
  const [environmentBackgroundUrl, setEnvironmentBackgroundUrl] =
    useEnvironmentStore(
      (state: any) => [
        state.environmentBackgroundUrl,
        state.setEnvironmentBackgroundUrl,
      ],
      shallow
    );

  const onChangeBackground = (e: any) => {
    const urlBackground = URL.createObjectURL(e.target.files[0]);
    setEnvironmentBackgroundUrl(urlBackground);
    console.log("🖼 NEW - background environment setted", urlBackground);
  };

  const onChangeAudio = (e: any) => {
    const urlAudio = URL.createObjectURL(e.target.files[0]);
    setAudioUrl(urlAudio);
    console.log("🎧 NEW - audio url setted", urlAudio);
  };

  useEffect(() => {
    console.log(audioUrl);
  }, [audioUrl]);

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
          {/* <img src={environmentBackgroundUrl}></img> */}
          <h1 className="text-xl font-semibold ">3D Web Player</h1>
          <hr className="opacity-10 m-0"></hr>
          <div>
            <h2 className="text-lg font-semibold ">Controls</h2>
            <div className="opacity-70 font-base">
              Play, pause, reset, resolution, ..
            </div>
            {audioUrl}
            <div className="bg-white/90 px-1 py-1 rounded-sm grid grid-flow-col text-slate-700 justify-start gap-4 text-sm">
              <Control
                add={addBloom}
                remove={removeBloom}
                reset={resetBloom}
                value={bloom}
                name="Bloom"
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                }
              ></Control>
              <Control
                add={addLightIntensity}
                remove={removeLightIntensity}
                reset={resetLightIntensity}
                value={lightIntensity}
                name="light"
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                }
              ></Control>

              <input
                accept=".pic"
                // accept="image/*"
                id="backgroundImage"
                type="file"
                className="hidden"
                onChange={onChangeBackground}
              />
              <Control
                name="background"
                icon={
                  <label htmlFor="backgroundImage">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </label>
                }
              ></Control>
              <Setting
                name="stars"
                value={stars}
                actions={{
                  top: resetStars,
                  amount: {
                    value: stars,
                    add: addStars,
                    remove: removeStars,
                    set: setStars,
                  },
                  size: {
                    value: stars,
                    add: addStars,
                    remove: removeStars,
                    set: setStars,
                  },
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  ></path>
                </svg>
              </Setting>
              <Setting
                name="music"
                actions={{
                  top: resetSceneSpeed,
                  scenespeed: {
                    value: sceneSpeed,
                    add: addSceneSpeed,
                    remove: removeSceneSpeed,
                    set: setSceneSpeed,
                  },
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  ></path>
                </svg>
              </Setting>
              <input
                accept="audio/*"
                id="audioUrl"
                type="file"
                className="hidden"
                onChange={onChangeAudio}
              />
              <Setting name="upload">
                <label htmlFor="audioUrl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </label>
              </Setting>
              <Setting name="chat">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  ></path>
                </svg>
              </Setting>
            </div>
            <div>
              Color hue
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
            </div>
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
