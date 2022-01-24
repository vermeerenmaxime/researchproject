import { useRouter } from "next/router";
import { PageContent } from "../../../src/components/PageContent";

import { useEffect } from "react";
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

const VideoContent = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const [setBloom, setLightIntensity, setSceneSpeed] = useSceneStore(
    (state) => [state.setBloom, state.setLightIntensity, state.setSceneSpeed],
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
    }

    if (data.audio) {
      if (data.audio.audioUrl) setAudioUrl(data.audio.audioUrl);
      if (data.audio.audioName) setAudioName(data.audio.audioName);
    }

    console.log(data);
  };

  useEffect(() => {
    setMode("view")
    if (videoId) {
      // const canvasSettings = require("../../../public/EditorSettings.json");
      const exploreSettings = require("../../../public/ExploreSettings.json");
      loadSettings(exploreSettings);
    }
  });

  return (
    <PageContent>
      <h1 className="text-xl font-semibold ">Video {videoId}</h1>
      <hr className="opacity-10 m-0"></hr>
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
