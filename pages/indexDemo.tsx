import type { NextPage } from "next";
import Head from "next/head";
import { Scene } from "../src/components/canvas/Scene";
import { CanvasPlayer } from "../src/components/CanvasPlayer";
import { useAudioStore } from "../src/stores/audioStore";
import shallow from "zustand/shallow";

const Home: NextPage = () => {
  const [audioStart, audioPlay, setAudioPlay] = useAudioStore(
    (state) => [state.audioStart, state.audioPlay, state.setAudioPlay],
    shallow
  );
  return (
    <>
      <Head>
        <title>3D Audio Visualizer :: Index</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-4">
        <button onClick={() => setAudioPlay(!audioPlay)}>
          {audioPlay ? "Pause" : "Play"}
        </button>
        <div className="bg-black aspect-video relative overflow-hidden lg:w-[50%] ">
          <CanvasPlayer>
            <Scene></Scene>
          </CanvasPlayer>
        </div>
      </div>
    </>
  );
};

export default Home;
