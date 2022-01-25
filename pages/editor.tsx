// @ts-ignore

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";

import shallow from "zustand/shallow";
import { useStore } from "../src/stores/store";
import { CanvasPlayer } from "../src/components/CanvasPlayer";
import { Menu } from "../src/components/menu/Menu";
import { MenuLink } from "../src/components/menu/Link";
import { PageContent } from "../src/components/PageContent";
import { Scene } from "../src/components/canvas/Scene";
import { Footer } from "../src/components/Footer";
import { Main } from "../src/components/Main";
import { useEnvironmentStore, useSceneStore } from "../src/stores/sceneStore";
import { useObjectStore } from "../src/stores/objectStore";
import { useAudioStore } from "../src/stores/audioStore";
import { Html } from "@react-three/drei";
import { formatTime } from "../src/utils/time";
import { useChatStore } from "../src/stores/chatStore";
import Cubes from "../src/components/models/Cubes";
import { Button } from "../src/components/Button";
import { useThemeStore } from "../src/stores/themeStore";
import { useEditorStore } from "../src/stores/editorStore";
import { EditorSettingsType } from "../src/types/EditorSettings";
import Slider, { Range } from "rc-slider";
import { InputRange } from "../src/components/InputRange";

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
    setBloom,
    addBloom,
    removeBloom,
    resetBloom,

    lightIntensity,
    addLightIntensity,
    removeLightIntensity,
    resetLightIntensity,
    setLightIntensity,
    setHue,

    sceneSpeed,
    addSceneSpeed,
    removeSceneSpeed,
    setSceneSpeed,
    resetSceneSpeed,

    lightColors,
    pointLight1,
    setPointLight1,
    pointLight2,
    setPointLight2,
  ] = useSceneStore(
    (state) => [
      state.bloom,
      state.setBloom,
      state.addBloom,
      state.removeBloom,
      state.resetBloom,

      state.lightIntensity,
      state.addLightIntensity,
      state.removeLightIntensity,
      state.resetLightIntensity,
      state.setLightIntensity,
      state.setHue,

      state.sceneSpeed,
      state.addSceneSpeed,
      state.removeSceneSpeed,
      state.setSceneSpeed,
      state.resetSceneSpeed,

      state.lightColors,

      state.pointLight1,
      state.setPointLight1,
      state.pointLight2,
      state.setPointLight2,
    ],
    shallow
  );

  const [
    stars,
    addStars,
    removeStars,
    setStars,
    resetStars,

    starSize,
    addStarSize,
    removeStarSize,
    resetStarSize,
    setStarSize,
  ] = useObjectStore(
    (state: any) => [
      state.stars,
      state.addStars,
      state.removeStars,
      state.setStars,
      state.resetStars,

      state.starSize,
      state.addStarSize,
      state.removeStarSize,
      state.resetStarSize,
      state.setStarSize,
    ],
    shallow
  );
  const [
    audioUrl,
    setAudioUrl,
    audioPlay,
    setAudioPlay,
    setAudioStart,
    audioLength,
    setAudioName,
    audioName,
    audioCurrentTime,
    setAudioCurrentTime,
    addAudioCurrentTime,
    kickFreq,
    setKickFreq,
  ] = useAudioStore(
    (state: any) => [
      state.audioUrl,
      state.setAudioUrl,
      state.audioPlay,
      state.setAudioPlay,
      state.setAudioStart,
      state.audioLength,
      state.setAudioName,
      state.audioName,
      state.audioCurrentTime,
      state.setAudioCurrentTime,
      state.addAudioCurrentTime,
      state.kickFreq,
      state.setKickFreq,
    ],
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
  const [messages, addMessage, setMessages] = useChatStore(
    (state: any) => [state.messages, state.addMessage, state.setMessages],
    shallow
  );
  const [theme, addTheme, setTheme, removeTheme] = useThemeStore(
    (state: any) => [
      state.theme,
      state.addTheme,
      state.setTheme,
      state.removeTheme,
    ],
    shallow
  );

  const [mode, setMode] = useEditorStore(
    (state: any) => [state.mode, state.setMode],
    shallow
  );

  const onChangeBackground = (e: any) => {
    const urlBackground = URL.createObjectURL(e.target.files[0]);
    setEnvironmentBackgroundUrl(urlBackground);
    console.log("🖼 NEW - background environment setted", urlBackground);
  };

  const onChangeAudio = (e: any) => {
    const urlAudio = URL.createObjectURL(e.target.files[0]);

    // remove string .mp3 .wav .flac, .. from names
    const name = e.target.files[0].name
      .replace(".mp3", "")
      .replace(".wav", "")
      .replace(".flac", "");

    setAudioName(name);

    setAudioUrl(urlAudio);
    setAudioPlay(false);

    console.log("🎧 NEW - audio url setted", urlAudio);
  };
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // setAudioCurrentTime(0)
    // setSeconds(0);
    // const timer = setInterval(() => {
    //   if (audioPlay) {
    //     // console.log("hey");
    //     // setSeconds(seconds + 1);
    //     // setAudioCurrentTime(audioCurrentTime + 1);
    //     // addAudioCurrentTime();
    //   }
    // }, 1000);
    // return () => clearInterval(timer);
    setMode("edit");
  });

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  const [inputMessage, setInputMessage] = useState("");

  const downloadSettingsRef: any = useRef();

  const saveSettings = () => {
    console.log("📥 Save settings");
    downloadSettingsRef.current.href =
      `data: "text/json;charset=utf-8,` +
      encodeURIComponent(JSON.stringify(downloadData()));
  };

  const downloadData = () => {
    return {
      scene: {
        bloom: bloom,
        lightIntensity: lightIntensity,
        sceneSpeed: sceneSpeed,
        pointLight1: pointLight1,
        pointLight2: pointLight2,
      },
      speed: {},
      objects: {
        stars: stars,
        starSize: starSize,
      },
      environment: {
        environmentBackgroundUrl: environmentBackgroundUrl,
      },
      audio: {
        audioUrl: audioUrl,
        audioName: audioName,
      },
      theme: {
        theme: theme,
      },
    };
  };

  const loadSettingsInputRef: any = useRef();

  interface InputFileType {
    target: { result: any; files: any };
  }
  const loadSettings = (e: { target: { files: Blob[] } } | any) => {
    if (e.target && e.target.files[0]) {
      console.log("📤 Load settings");
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e: any) => {
        const data = JSON.parse(e.target.result as string);
        if (!data) return;

        if (data.environment) {
          // if (data.environment.environmentBackgroundUrl)
          //   setEnvironmentBackgroundUrl(
          //     data.environment.environmentBackgroundUrl
          //   );
        }

        if (!data.objects) {
          if (data.objects.stars) setStars(data.objects.stars);
          if (data.objects.starSize) setStarSize(data.objects.starSize);
        }

        if (data.scene) {
          if (data.scene.bloom) setBloom(data.scene.bloom);
          if (data.scene.lightIntensity)
            setLightIntensity(data.scene.lightIntensity);
          if (data.scene.sceneSpeed) setSceneSpeed(data.scene.sceneSpeed);
          if (data.scene.pointLight1) setPointLight1(data.scene.pointLight1);
          if (data.scene.pointLight2) setPointLight2(data.scene.pointLight2);
        }

        if (data.audio) {
          if (data.audio.audioUrl) setAudioUrl(data.audio.audioUrl);
          if (data.audio.audioName) setAudioName(data.audio.audioName);
        }

        if (data.theme.theme) setTheme(data.theme.theme);

        console.log(data);
        loadSettingsInputRef.current.value = "";
        // console.log("e.target.result", e.target.result);
      };
    }
  };

  useEffect(() => {
    console.log("🪄 Loaded new theme: " + theme);
  }, [theme]);
  useEffect(() => {
    console.log("", bloom);
  }, [bloom]);
  return (
    <>
      <Head>
        <title>3D Audio Visualizer - Editor</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContent>
        {/* <img src={environmentBackgroundUrl}></img> */}
        <h1 className="text-xl font-semibold ">3D Web Player</h1>
        <hr className="opacity-10 m-0"></hr>
        {mode === "edit" && (
          <>
            <div className="grid grid-flow-col gap-4 justify-start">
              <input
                accept=".json"
                type="file"
                className="hidden"
                id="settingsUpload"
                onChange={loadSettings}
                ref={loadSettingsInputRef}
              />
              <label htmlFor="settingsUpload">
                <Button
                  icon={
                    <svg
                      className="w-4 h-4"
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
                  }
                >
                  Load settings
                </Button>
              </label>
              <a
                download="EditorSettings.json"
                ref={downloadSettingsRef}
                onClick={saveSettings}
              >
                <Button
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      ></path>
                    </svg>
                  }
                >
                  Save settings
                </Button>
              </a>
            </div>
            <div>
              <div>
                {/* <h2 className="text-lg font-semibold ">Controls</h2>
            <div className="opacity-70 font-base">
              Play, pause, reset, resolution, ..
            </div> */}

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
                        value: starSize,
                        add: addStarSize,
                        remove: removeStarSize,
                        set: setStarSize,
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
                  </Setting>{" "}
                  <div>
                    Color hue
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(e) => {
                        setHue(parseInt(e.target.value));
                        // console.log(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 justify-start grid-cols-3">
              <div className="box">
                <b>Frequency controls</b>
                <hr className="opacity-20"></hr>
                <div className="flex justify-between items-center">
                  <p>
                    Kick ({kickFreq[0]},{kickFreq[1]})
                  </p>
                  <div className="grid gap-2 grid-cols-2 w-36">
                    {/* <InputRange
                      valueArray={[10, 20]}
                      setValue={setKickFreq}
                      props={{ setKickFreq: setKickFreq }}
                    /> */}
                    <input
                      className="input"
                      type="number"
                      value={kickFreq[0]}
                      placeholder="Start.."
                      max={64}
                      onChange={(e) => {
                        setKickFreq([parseInt(e.target.value), kickFreq[1]]);
                      }}
                    />
                    <input
                      className="input"
                      type="number"
                      value={kickFreq[1]}
                      placeholder="End.."
                      max={64}
                      onChange={(e) => {
                        setKickFreq([kickFreq[0], parseInt(e.target.value)]);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="flex  justify-between items-center">
                  <p>Mid</p>
                  <div className="grid gap-2 grid-cols-2 w-36">
                    {/* <InputRange values={[1, 2]} /> */}
                  </div>
                </div>
                <div className="flex  justify-between items-center">
                  <p>High</p>
                  <div className="grid gap-2 grid-cols-2 w-36">
                    {/* <InputRange values={[1, 2]} /> */}
                  </div>
                </div>
                {/* <input type="slider"></input> */}
                {/* Todo: remove slider & range package */}
                {/* <Slider min={10} max={100} step={5} dots={true} />
                <Range defaultValue={[2, 100]} /> */}
              </div>
              <div className="box">
                <b>Light controls</b>
                <hr className="opacity-20"></hr>
                <div className="flex justify-between items-center">
                  <p>Pointlight 1</p>
                  <div className="grid gap-2 ">
                    <select
                      className="input capitalize"
                      placeholder="Select color.."
                      onChange={(e) => {
                        setPointLight1(e.target.value);
                      }}
                    >
                      {lightColors.map((key, i) => {
                        return (
                          <option key={i} value={key}>
                            {key}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                Transform
                <div className="grid gap-2 grid-cols-3">
                  <input className="input" placeholder="X.."></input>
                  <input className="input" placeholder="Y.."></input>
                  <input className="input" placeholder="Z.."></input>
                </div>
                <div className="flex justify-between items-center">
                  <p>Intensity</p>
                  <div className="grid gap-2 ">
                    <select className="input" placeholder="Select intensity..">
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
                <hr className="opacity-20"></hr>
                <div className="flex justify-between items-center">
                  <p>Pointlight 2</p>
                  <div className="grid gap-2 ">
                    <select
                      className="input capitalize"
                      placeholder="Select color.."
                      onChange={(e) => setPointLight2(e.target.value)}
                    >
                      {lightColors.map((key, i) => {
                        return (
                          <option key={i} value={key}>
                            {key}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div>
          {/* Create input box where input has to contain only letters and numbers */}
        </div>
        {mode === "edit" ? (
          <div className="box items-start">
            <div className="grid grid-flow-col gap-2">
              <Button onClick={() => setTheme("heart")}>Heart</Button>
              <Button onClick={() => setTheme("space")}>Space</Button>
              <Button onClick={() => setTheme("car")}>Car</Button>
              <Button onClick={() => setTheme("explore")}>Explore</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-col gap-2 justify-start">
            <input
              className="bg-white/10 px-3 py-2 border-[1px] border-white/10 rounded-sm outline-none"
              type="text"
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
            />
            <button
              onClick={() =>
                addMessage({ name: "Mave", message: inputMessage })
              }
              className="px-5 py-2 border-white/10 border-2 rounded-sm outline-none bg-white/20 hover:bg-white/5 transition-all uppercase text-xs"
            >
              Add message
            </button>
          </div>
        )}

        <div className="grid gap-2">
          <div className="bg-black aspect-video rounded-sm relative overflow-hidden lg:w-[100%]">
            <CanvasPlayer>
              <Scene></Scene>
            </CanvasPlayer>
          </div>
          {/* <div className="bg-white/10 aspect-video">

              <CanvasPlayer>
                
                <Cubes></Cubes>
              </CanvasPlayer>
            </div> */}
          <div className="bg-white/10 rounded-sm text-sm relative ">
            <div className="px-5 py-4 flex justify-between items-center">
              <div className="grid gap-2 grid-flow-col items-center">
                <div className="flex space-x-1 items-center">
                  <svg
                    className="w-5 h-5 rotate-180	"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    ></path>
                  </svg>
                  <svg
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setAudioPlay(!audioPlay);
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {audioPlay ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </>
                    )}
                  </svg>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    ></path>
                  </svg>
                </div>
                <div className="flex items-center opacity-75">
                  {/* Mave & Alex Silves - Memories */}
                  {audioName}
                </div>
                {/* <div className="bg-white/20 py-1 px-2 rounded-full text-xs opacity-75">
                    {audioLength ? formatTime(audioCurrentTime) : "00:00"}
                  </div> */}
              </div>
              <div className="text-xs opacity-50 ">
                {audioLength ? formatTime(audioLength) : "00:00"}
              </div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 h-[1.5px] w-1/3 bg-white/80 m-1"></div>
          </div>
        </div>
        <div>
          <audio>
            <source src="/audio/memories.mp3" type="audio/mpeg" />
          </audio>
        </div>
        <Footer></Footer>
      </PageContent>
    </>
  );
};

export default Editor;
