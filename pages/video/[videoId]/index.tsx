import { useRouter } from "next/router";
import { PageContent } from "../../../src/components/PageContent";

import { useEffect, useRef, useState } from "react";
import {
  useEnvironmentStore,
  useSceneStore,
} from "../../../src/stores/sceneStore";
import shallow from "zustand/shallow";
import { useObjectStore } from "../../../src/stores/objectStore";
import { useAudioStore } from "../../../src/stores/audioStore";
import { CanvasPlayer } from "../../../src/components/CanvasPlayer";
import { Scene } from "../../../src/components/canvas/Scene";
import { AudioPlayer } from "../../../src/components/AudioPlayer";
import { useEditorStore } from "../../../src/stores/editorStore";
import { useThemeStore } from "../../../src/stores/themeStore";
import Head from "next/head";

// import { Server } from "socket.io";
// import SocketIOClient from "socket.io-client";

// interface IMsg {
//   user: string;
//   msg: string;
// }

// create random user
const user = "User_" + String(new Date().getTime()).substr(-3);

const VideoContent = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const [
    setBloom,
    setLightIntensity,
    setSceneSpeed,
    setPointLight1,
    setPointLight2,
    setHue,
  ] = useSceneStore(
    (state) => [
      state.setBloom,
      state.setLightIntensity,
      state.setSceneSpeed,
      state.setPointLight1,
      state.setPointLight2,
      state.setHue,
    ],
    shallow
  );

  const [setStars, setStarSize] = useObjectStore(
    (state: any) => [state.setStars, state.setStarSize],
    shallow
  );

  const [setEnvironmentBackgroundUrl] = useEnvironmentStore(
    (state: any) => [state.setEnvironmentBackgroundUrl],
    shallow
  );

  const [
    setAudioUrl,
    setAudioName,
    audioName,
    setAudioGenre,
    setLowFreq,
    setMidFreq,
    setHighFreq,
  ] = useAudioStore(
    (state: any) => [
      state.setAudioUrl,
      state.setAudioName,
      state.audioName,
      state.setAudioGenre,
      state.setLowFreq,
      state.setMidFreq,
      state.setHighFre,
    ],
    shallow
  );

  const [mode, setMode, fullscreen] = useEditorStore(
    (state: any) => [state.mode, state.setMode, state.fullscreen],
    shallow
  );

  const [setTheme] = useThemeStore((state: any) => [state.setTheme], shallow);

  const loadSettings = (canvasSettings: any) => {
    console.log("📤 Load settings");

    const data = JSON.parse(JSON.stringify(canvasSettings));

    if (!data) return;

    if (data.environment) {
      if (data.environment.environmentBackgroundUrl)
        setEnvironmentBackgroundUrl(data.environment.environmentBackgroundUrl);
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
      if (data.audio.audioGenre) setAudioGenre(data.audio.audioGenre);
      if (data.audio.lowFreq) setLowFreq(data.audio.lowFreq);
      if (data.audio.midFreq) setMidFreq(data.audio.midFreq);
      if (data.audio.highFreq) setHighFreq(data.audio.highFreq);
    }

    if (data.theme) if (data.theme.theme) setTheme(data.theme.theme);
    // console.log(data);
  };

  useEffect(() => {
    setMode("view");
    if (videoId) {
      // const canvasSettings = require("../../../public/EditorSettings.json");

      // let themeSettings;
      // if (videoId === "1")
      //   themeSettings = require("../../../public/ExploreSettings.json");
      // if (videoId === "2")
      //   themeSettings = require("../../../public/SpaceSettings.json");
      // else themeSettings = require("../../../public/ExploreSettings.json");

      const data = require("../../../public/VideoData.json");
      const videoIdNumber = parseInt(videoId as string);
      try {
        const themeSettings = data[videoIdNumber].canvas;
        loadSettings(themeSettings);
      } catch {
        console.log("Could not load data.");
      }

      // console.log(themeSettings);
    }
  });

  return (
    <>
      <Head>
        <title>{audioName}</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent>
        <h1 className="text-xl font-semibold ">Video</h1>
        {audioName}
        <hr className="opacity-10 m-0"></hr>
        <div className={`grid gap-2 ${fullscreen ? "fixed inset-0" : ""}`}>
          <div className="bg-white/10 aspect-video rounded-sm relative overflow-hidden lg:w-[100%] ">
            <CanvasPlayer>
              <Scene></Scene>
            </CanvasPlayer>
          </div>
          <AudioPlayer></AudioPlayer>
        </div>
      </PageContent>
    </>
  );
};

export default VideoContent;
