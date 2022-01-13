import { Html, OrbitControls, useProgress } from "@react-three/drei";
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
import { useSceneStore } from "../stores/sceneStore";
import shallow from "zustand/shallow";
import { useFrame } from "@react-three/fiber";

export const Scene = () => {
  const [bloom, addBloom, removeBloom, resetBloom, lightIntensity, hue] =
    useSceneStore(
      (state) => [
        state.bloom,
        state.addBloom,
        state.removeBloom,
        state.resetBloom,
        state.lightIntensity,
        state.hue,
      ],
      shallow
    );

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

  useEffect(() => {
    // bloomRef.current.intensity = Math.round(bloom * 10) / 10;
    console.log(bloomRef.current.intensity);
  }, [bloom]);

  useEffect(() => {
    directionalLight1Ref.current.intensity = lightIntensity;
    directionalLight2Ref.current.intensity = lightIntensity;
  }, [lightIntensity]);

  useEffect(() => {
    hueRef.current.setHue(hue);
  }, [hue]);

  useFrame(() => {
    bloomRef.current.intensity = Math.round(bloom * 10) / 10;
    //todo: bloom not working
    // hueRef.current.hue += 0.1;
    // hueRef.current.setHue(hue);
    // for (let key of hueRef.current.uniforms) {
    //   // console.log(key)
    //   if (key[0] === "hue") {
    //     // console.log(key[1].value);
    //     // key[1].value.x += 0.01;
    //   }
    // }
    // bloomRef.current.luminanceSmoothing = 10;
    // console.log(effectRef.current);
    // if (bloomRef.current) bloomRef.current.luminanceSmoothing = 10;
    // console.log(bloomRef.current)
  });

  return (
    <>
      <EffectComposer ref={effectRef}>
        <HueSaturation
          ref={hueRef}
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={10} // hue in radians
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
          intensity={1}
          // Hoogte van bloom
          height={400}
        />
        {/* <Noise opacity={0.03} /> */}
        <Vignette eskil={false} offset={0.01} darkness={1} />
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
      <directionalLight
        ref={directionalLight1Ref}
        color="white"
        position={[-5, -5, -5]}
        intensity={0.5}
      />
      <directionalLight
        ref={directionalLight2Ref}
        color="white"
        position={[5, 5, 10]}
        intensity={0.5}
      />
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense fallback={null}>
        <SceneObjects></SceneObjects>
      </Suspense>
    </>
  );
};
