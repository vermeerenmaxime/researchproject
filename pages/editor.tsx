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
import { AudioPlayer } from "../src/components/AudioPlayer";

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
    hue,
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
      state.hue,
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
    audioGenre,
    setAudioGenre,
    audioCurrentTime,
    setAudioCurrentTime,
    addAudioCurrentTime,
    kickFreq,
    setKickFreq,
    lowFreq,
    setLowFreq,
    midFreq,
    setMidFreq,
    highFreq,
    setHighFreq,
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
      state.audioGenre,
      state.setAudioGenre,
      state.audioCurrentTime,
      state.setAudioCurrentTime,
      state.addAudioCurrentTime,
      state.kickFreq,
      state.setKickFreq,
      state.lowFreq,
      state.setLowFreq,
      state.midFreq,
      state.setMidFreq,
      state.highFreq,
      state.setHighFreq,
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

  const [mode, setMode, fullscreen] = useEditorStore(
    (state: any) => [state.mode, state.setMode, state.fullscreen],
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

  useEffect(() => {
    setMode("edit");
  });

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
        hue: hue,
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
        audioGenre: audioGenre,
        kickFreq: kickFreq,
        lowFreq: lowFreq,
        midFreq: midFreq,
        highFreq: highFreq,
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
          if (data.scene.hue) setHue(data.scene.hue);
        }

        if (data.audio) {
          if (data.audio.audioUrl) setAudioUrl(data.audio.audioUrl);
          if (data.audio.audioName) setAudioName(data.audio.audioName);
          if (data.audio.kickFreq) setKickFreq(data.audio.kickFreq);
          if (data.audio.lowFreq) setLowFreq(data.audio.lowFreq);
          if (data.audio.midFreq) setMidFreq(data.audio.midFreq);
          if (data.audio.highFreq) setHighFreq(data.audio.highFreq);
          if (data.audio.audioGenre) setAudioGenre(data.audio.audioGenre);
        }

        if (data.theme.theme) setTheme(data.theme.theme);

        console.log(data);
        loadSettingsInputRef.current.value = "";
        // console.log("e.target.result", e.target.result);
      };
    }
  };

  const saveVideo = () => {
    console.log("save to backend");
  };

  useEffect(() => {
    console.log("🪄 Loaded new theme: " + theme);
  }, [theme]);

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

              <Button
                onClick={saveVideo}
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
                Save to videos
              </Button>
            </div>
            <div>
              <div>
                {/* <h2 className="text-lg font-semibold ">Controls</h2>
            <div className="opacity-70 font-base">
              Play, pause, reset, resolution, ..
            </div> */}

                <div className="bg-white/90 px-1 py-1 rounded-sm grid grid-flow-col text-slate-700 justify-start gap-2 text-sm">
                  {/* <Control
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
                  ></Control> */}
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
                  {/* <Setting
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
                  </Setting> */}
                  {/* <Setting
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
                  </Setting> */}
                  {/* <input
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
                  </Setting> */}
                  {/* <Setting name="chat">
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
                  </Setting>{" "} */}
                </div>
              </div>
            </div>
            <div className="grid gap-4 justify-start grid-cols-3">
              <div className="box">
                <b>Frequency range (0-64)</b>
                <hr className="opacity-20"></hr>

                <p>
                  Kick ({kickFreq[0]},{kickFreq[1]})
                </p>
                <div className="grid gap-2 grid-cols-2 ">
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
                    min={0}
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
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setKickFreq([kickFreq[0], parseInt(e.target.value)]);
                    }}
                  />
                </div>

                <p>
                  Low ({lowFreq[0]},{lowFreq[1]})
                </p>
                <div className="grid gap-2 grid-cols-2 ">
                  <input
                    className="input"
                    type="number"
                    value={lowFreq[0]}
                    placeholder="Start.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setLowFreq([parseInt(e.target.value), lowFreq[1]]);
                    }}
                  />
                  <input
                    className="input"
                    type="number"
                    value={lowFreq[1]}
                    placeholder="End.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setLowFreq([lowFreq[0], parseInt(e.target.value)]);
                    }}
                  />
                </div>

                <p>
                  Mid ({midFreq[0]},{midFreq[1]})
                </p>
                <div className="grid gap-2 grid-cols-2 ">
                  <input
                    className="input"
                    type="number"
                    value={midFreq[0]}
                    placeholder="Start.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setMidFreq([parseInt(e.target.value), midFreq[1]]);
                    }}
                  />
                  <input
                    className="input"
                    type="number"
                    value={midFreq[1]}
                    placeholder="End.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setMidFreq([midFreq[0], parseInt(e.target.value)]);
                    }}
                  />
                </div>

                <p>
                  High ({highFreq[0]},{highFreq[1]})
                </p>
                <div className="grid gap-2 grid-cols-2 ">
                  {/* <InputRange values={[1, 2]} /> */}
                  <input
                    className="input"
                    type="number"
                    value={highFreq[0]}
                    placeholder="Start.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setHighFreq([parseInt(e.target.value), highFreq[1]]);
                    }}
                  />
                  <input
                    className="input"
                    type="number"
                    value={highFreq[1]}
                    placeholder="End.."
                    min={0}
                    max={64}
                    onChange={(e) => {
                      setHighFreq([highFreq[0], parseInt(e.target.value)]);
                    }}
                  />
                </div>
                {/* <input type="slider"></input> */}
                {/* Todo: remove slider & range package */}
                {/* <Slider min={10} max={100} step={5} dots={true} />
                <Range defaultValue={[2, 100]} /> */}
              </div>
              <div className="box">
                <b>Light</b>
                <hr className="opacity-20"></hr>
                <div>Light ({lightIntensity})</div>
                <input
                  type="range"
                  step={0.1}
                  min={0}
                  max={2}
                  value={lightIntensity}
                  onChange={(e: any) => setLightIntensity(e.target.value)}
                ></input>
                <hr></hr>
                <div className="flex justify-between items-center">
                  <p>Pointlight 1</p>
                  <div className="grid gap-2 ">
                    <select
                      className="input capitalize"
                      placeholder="Select color.."
                      onChange={(e) => {
                        setPointLight1(e.target.value);
                      }}
                      value={pointLight1}
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
                {/* Transform
                <div className="grid gap-2 grid-cols-3">
                  <input className="input" placeholder="X.."></input>
                  <input className="input" placeholder="Y.."></input>
                  <input className="input" placeholder="Z.."></input>
                </div> */}
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
                      value={pointLight2}
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
              <div className="box">
                <b>Bloom</b>
                <hr></hr>
                <div>Intensity ({bloom})</div>
                <input
                  type="range"
                  step={0.1}
                  min={0}
                  max={2}
                  value={bloom}
                  onChange={(e: any) => setBloom(e.target.value)}
                ></input>
                <b>Genre</b>
                <hr></hr>
                <div>Name</div>
                <input
                  type="text"
                  className="input"
                  value={audioGenre}
                  onChange={(e: any) => setAudioGenre(e.target.value)}
                ></input>
              </div>
              <div className="box">
                <b>Music</b>
                <hr></hr>
                <div>Scene speed ({sceneSpeed})</div>
                <input
                  type="range"
                  step={0.1}
                  min={0.5}
                  max={10}
                  value={sceneSpeed}
                  onChange={(e: any) => setSceneSpeed(e.target.value)}
                ></input>
                <input
                  accept="audio/*"
                  id="audioUrl"
                  type="file"
                  className="hidden"
                  onChange={onChangeAudio}
                />
                <div>Trackname</div>
                <input
                  type="text"
                  className="input"
                  value={audioName}
                  onChange={(e: any) => setAudioName(e.target.value)}
                ></input>
                <label htmlFor="audioUrl" className="self-start">
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
                    Upload Track
                  </Button>
                </label>
              </div>
              <div className="box">
                <b>Background</b>
                <hr></hr>
                <div>Color hue </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={hue}
                  onChange={(e) => {
                    setHue(parseInt(e.target.value));
                  }}
                />
                {/* <input
                  accept=".pic,.hdr"
                  id="backgroundImage"
                  type="file"
                  className="hidden"
                  onChange={onChangeBackground}
                />
                <label htmlFor="backgroundImage" className="self-start">
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
                    Upload Background
                  </Button>
                </label> */}
              </div>
              <div className="box">
                <b>Stars</b>
                <hr></hr>
                <div>Amount </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  value={stars}
                  onChange={(e) => {
                    setStars(e.target.value);
                  }}
                />
                <div>Size stars </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={starSize}
                  onChange={(e) => {
                    setStarSize(e.target.value);
                  }}
                />
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

        <div className={`grid gap-2 ${fullscreen ? "fixed inset-0" : ""}`}>
          <div className="bg-black aspect-video rounded-sm relative overflow-hidden lg:w-[100%] ">
            <CanvasPlayer>
              <Scene></Scene>
            </CanvasPlayer>
          </div>
          <AudioPlayer></AudioPlayer>
          {/* <div className="bg-white/10 aspect-video">

              <CanvasPlayer>
                
                <Cubes></Cubes>
              </CanvasPlayer>
            </div> */}
        </div>

        <Footer></Footer>
      </PageContent>
    </>
  );
};

export default Editor;
