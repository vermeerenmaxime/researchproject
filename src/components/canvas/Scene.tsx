import {
  Environment,
  Html,
  OrbitControls,
  Reflector,
  useProgress,
  useTexture,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";

// @ts-ignore
import { BlurPass, Resizer, KernelSize, BlendFunction } from "postprocessing";
import { SceneObjects } from "./SceneObjects";
import { useEnvironmentStore, useSceneStore } from "../../stores/sceneStore";
import shallow from "zustand/shallow";
import { useFrame } from "@react-three/fiber";
import { useAudioStore } from "../../stores/audioStore";
import { Ground } from "./Ground.jsx";

export const Scene = () => {
  const [bloom, lightIntensity, hue] = useSceneStore(
    (state) => [state.bloom, state.lightIntensity, state.hue],
    shallow
  );
  const [environmentBackgroundUrl] = useEnvironmentStore(
    (state) => [state.environmentBackgroundUrl],
    shallow
  );
  //   const [audioUrl] = useAudioStore((state) => [state.audioUrl], shallow);

  //   const Loader = () => {
  //     const { active, progress, errors, item, loaded, total } = useProgress();
  //     return (
  //       <Html center>
  //         <div className="bg-black/20 rounded-sm p-8 flex w-48 items-center justify-center">
  //           {Math.round(progress)} % loaded
  //         </div>
  //       </Html>
  //     );
  //   };

  const directionalLight1Ref: any = useRef();
  const directionalLight2Ref: any = useRef();
  const vignetteRef: any = useRef();
  const hueRef: any = useRef();
  const glitchRef: any = useRef();
  const depthOfFieldRef: any = useRef();
  const bloomRef: any = useRef();
  const effectRef: any = useRef();

  return (
    <>
      {/* <Html fullscreen>
         <div>Track title</div>
        <div>Artists</div>
        <div>Track title</div> 
      </Html> */}
      <EffectComposer ref={effectRef} multisampling={8}>
        {/* <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={0.6}
        /> */}
        <Bloom
          kernelSize={KernelSize.HUGE}
          luminanceThreshold={0}
          luminanceSmoothing={0}
          intensity={0.2}
        />
        <HueSaturation
          ref={hueRef}
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={hue} // hue in radians
          saturation={0.5} // saturation in radians
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
          ref={bloomRef}
          blendFunction={BlendFunction.SCREEN}
          luminanceThreshold={0}
          luminanceSmoothing={1}
          intensity={Math.round(bloom * 10) / 10}
          // Hoogte van bloom
          height={400}
        />
        {/* <Noise opacity={0.03} /> */}
        <Vignette eskil={false} offset={0.01} darkness={1} />
      </EffectComposer>

      <ambientLight intensity={0.0001} />

      <directionalLight
        ref={directionalLight1Ref}
        color="white"
        position={[-5, -5, -5]}
        intensity={lightIntensity}
      />
      <directionalLight
        ref={directionalLight2Ref}
        color="white"
        position={[5, 5, 10]}
        intensity={lightIntensity}
      />
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense fallback={null}>
        <mesh rotation={[-1.6, 0, 0]} position={[0, -10, 0]}>
          <Ground
            //@ts-ignore
            mirror={1}
            blur={[500, 100]}
            mixBlur={12}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            position-y={-1}
          />
        </mesh>
        <Environment files={environmentBackgroundUrl} background />
        <SceneObjects></SceneObjects>
      </Suspense>
    </>
  );
};
