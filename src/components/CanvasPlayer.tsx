import { AdaptiveDpr, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

export const CanvasPlayer = ({ children }: any) => {
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
      <Loader />
      <div className="absolute top-4 right-6 uppercase text-xs opacity-50">
        fullscreen
      </div>
    </>
  );
};
