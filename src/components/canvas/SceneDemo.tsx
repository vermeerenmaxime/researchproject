import { Loader } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense } from "react";

import { SceneObjects } from "./SceneObjects";

export const Scene = () => {
  return (
    <>
      <EffectComposer multisampling={8}>
        <DepthOfField
          focusDistance={1.5}
          focalLength={0.02}
          bokehScale={0.2}
          height={480}
        />
        <Vignette eskil={false} offset={0.01} darkness={1} />
      </EffectComposer>
      <ambientLight intensity={0.1} />
      <Suspense fallback={<Loader />}>
        <SceneObjects />
      </Suspense>
    </>
  );
};
