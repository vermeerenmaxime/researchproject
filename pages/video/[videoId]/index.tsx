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
  ] = useSceneStore(
    (state) => [
      state.setBloom,
      state.setLightIntensity,
      state.setSceneSpeed,
      state.setPointLight1,
      state.setPointLight2,
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

  const [setAudioUrl, setAudioName] = useAudioStore(
    (state: any) => [state.setAudioUrl, state.setAudioName],
    shallow
  );

  const [mode, setMode] = useEditorStore(
    (state: any) => [state.mode, state.setMode],
    shallow
  );

  const loadSettings = (canvasSettings: any) => {
    console.log("📤 Load settings");

    // const data = JSON.parse("canavsSettings.json");
    // import import json file as object
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
    }

    if (data.audio) {
      if (data.audio.audioUrl) setAudioUrl(data.audio.audioUrl);
      if (data.audio.audioName) setAudioName(data.audio.audioName);
    }

    console.log(data);
  };

  useEffect(() => {
    setMode("view");
    if (videoId) {
      // const canvasSettings = require("../../../public/EditorSettings.json");
      const exploreSettings = require("../../../public/ExploreSettings.json");
      loadSettings(exploreSettings);
    }
  });

  // // connected flag
  // const [connected, setConnected] = useState<boolean>(false);

  // // init chat and message
  // const [chat, setChat] = useState<IMsg[]>([]);
  // const [msg, setMsg] = useState<string>("");

  // useEffect(() => {
  //   // connect to socket server

  //   const socket = SocketIOClient.connect(process.env.BASE_URL, {
  //     path: "/api/socketio",
  //   });

  //   // log socket connection
  //   socket.on("connect", () => {
  //     console.log("SOCKET CONNECTED!", socket.id);
  //     setConnected(true);
  //   });

  //   // update chat on new message dispatched
  //   socket.on("message", (message: IMsg) => {
  //     chat.push(message);
  //     setChat([...chat]);
  //   });

  //   // socket disconnet onUnmount if exists
  //   if (socket) return () => socket.disconnect();
  // }, []);

  // const inputRef: any = useRef(null);

  // const sendMessage = async () => {
  //   if (msg) {
  //     // build message obj
  //     const message: IMsg = {
  //       user,
  //       msg,
  //     };

  //     // dispatch message to other users
  //     const resp = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(message),
  //     });

  //     // reset field if OK
  //     if (resp.ok) setMsg("");
  //   }

  //   // focus after click
  //   inputRef?.current?.focus();
  // };

  return (
    <PageContent>
      <h1 className="text-xl font-semibold ">Video {videoId}</h1>
      <hr className="opacity-10 m-0"></hr>
      {/* <input
        className="input"
        ref={inputRef}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      ></input>
      <button onClick={sendMessage} disabled={!connected}>
        SEND
      </button> */}
      <div className="bg-white/10 aspect-video rounded-sm relative overflow-hidden lg:w-[100%] ">
        <CanvasPlayer>
          <Scene></Scene>
        </CanvasPlayer>
      </div>
      <AudioPlayer></AudioPlayer>
    </PageContent>
  );
};

export default VideoContent;
