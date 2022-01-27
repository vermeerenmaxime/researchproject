import {
  AdaptiveDpr,
  CameraShake,
  FlyControls,
  Loader,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import shallow from "zustand/shallow";
import { useEditorStore } from "../stores/editorStore";

export const CanvasPlayer = ({ children }: any) => {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 3, 10], rotation: [0, 0, 0] }}
        mode="concurrent"
        dpr={2}
      >
        {/* <FlyControls
            autoForward={false}
            dragToLook={false}
            movementSpeed={5.0}
            rollSpeed={0.005}
            makeDefault
          /> */}
        <OrbitControls
          maxDistance={20}
          minDistance={5}
          enableZoom={true}
          makeDefault
        />
        <AdaptiveDpr pixelated />
        {children}
      </Canvas>
    </>
  );
};
