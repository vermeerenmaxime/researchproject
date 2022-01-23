import {
  Html,
  Loader,
  OrbitControls,
  Stars,
  useProgress,
  AdaptiveDpr,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
  HueSaturation,
} from "@react-three/postprocessing";
// @ts-ignore
import { BlurPass, Resizer, KernelSize, BlendFunction } from "postprocessing";

import type { NextPage } from "next";
import Head from "next/head";
import { Suspense, useEffect, useRef } from "react";
import { SceneObjects } from "../src/components/canvas/SceneObjects";

import shallow from "zustand/shallow";
import { useStore } from "../src/stores/store";

const CanvasPlayer = ({ children }: any) => {
  const canvasRef: any = useRef();

  return (
    <>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 5, 10] }}
        vr={false} //Dunno what this does !todo
        mode="concurrent"
        className="overflow-hidden "
        dpr={2}
      >
        <AdaptiveDpr pixelated />
        {children}
      </Canvas>
      {/* Build in loader from drei */}
      {/* <Loader /> */}
    </>
  );
};

const Scene = () => {
  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
      <Html center>
        <div className="bg-black/20 rounded-sm p-8 flex w-48 items-center justify-center">
          {Math.round(progress)} % loaded
        </div>
      </Html>
    );
  };

  const directionalLight1Ref: any = useRef();
  const directionalLight2Ref: any = useRef();
  const vignetteRef: any = useRef();
  const hueRef: any = useRef();
  const glitchRef: any = useRef();
  const depthOfFieldRef: any = useRef();
  const bloomRef: any = useRef();

  return (
    <>
      <EffectComposer>
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={0} // hue in radians
          saturation={0} // saturation in radians
        />
        <Glitch
          active={false} // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.95} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
        <DepthOfField
          focusDistance={1.5}
          focalLength={0.02}
          bokehScale={0.2}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.SCREEN}
          luminanceThreshold={0}
          luminanceSmoothing={1}
          height={300}
        />
        {/* <Noise opacity={0.03} /> */}
        <Vignette eskil={false} offset={0.01} darkness={0.9} />
      </EffectComposer>
      <OrbitControls
        maxDistance={20}
        minDistance={3}
        enableZoom={true}
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
      <ambientLight intensity={0.01} />
      <directionalLight color="white" position={[-5, -5, -5]} intensity={0.5} />
      <directionalLight color="white" position={[5, 5, 10]} intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <SceneObjects></SceneObjects>
      </Suspense>
    </>
  );
};
const PageContent = ({ children }: any) => {
  return (
    <section className="bg-slate-900/95 text-white ">
      <div className="p-8 grid gap-8 max-w-[900px]">{children}</div>
    </section>
  );
};
const Home: NextPage = () => {
  // const likes = useStore((state) => state.likes);
  // const addLike = useStore((state) => state.increaseLike);
  // const removeLikes = useStore((state) => state.removeAllLikes);

  const [likes, addLike, removeLikes] = useStore(
    (state) => [state.likes, state.increaseLike, state.removeAllLikes],
    shallow
  );

  useEffect(() => {
    console.log(likes);
  }, [likes]);
  // const likes = useStore();
  return (
    <>
      <Head>
        <title>3D Audio Visualizer</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContent>
        <h1 className="text-xl font-semibold ">3D Web Player</h1>
        <hr className="opacity-10 m-0"></hr>
        <div>
          <h2 className="text-lg font-semibold ">Controls</h2>
          <div className="opacity-70 font-base">
            Play, pause, reset, resolution, ..
          </div>
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
        {/* <video src="/video/video.mp4" loop controls></video> */}
        <div className="bg-white/10 aspect-video rounded-sm relative overflow-hidden lg:w-[100%]">
          <CanvasPlayer>
            <Scene></Scene>
          </CanvasPlayer>
          <div className="absolute top-4 right-6 uppercase text-xs opacity-50">
            fullscreen
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default Home;
