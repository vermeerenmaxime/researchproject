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
      <div className="absolute top-4 right-6 uppercase text-xs opacity-50 grid grid-flow-col gap-2 items-center cursor-pointer hover:opacity-75 transition-opacity">
        <div>fullscreen </div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          ></path>
        </svg>
      </div>
    </>
  );
};
