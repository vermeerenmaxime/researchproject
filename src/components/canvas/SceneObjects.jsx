import {
  Billboard,
  Environment,
  Stars,
  Sky,
  PositionalAudio,
  MeshWobbleMaterial,
  Box,
  Html,
  TransformControls,
} from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import Heart from "../models/Heart.js";
import Bugatti from "../models/Bugatti.js";
import Cubes from "../models/Cubes.js";
import Diodes from "../models/Diodes.js";
import Orb from "../models/Orb.js";
import Cube from "../models/Cube.js";
import Rainbow from "../models/Rainbow.js";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
// @ts-ignore
import { BlendFunction } from "postprocessing";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { avg } from "../../utils/calculations";
import { formatTime } from "../../utils/time";

import { useObjectStore } from "../../stores/objectStore";
import { useSceneStore } from "../../stores/sceneStore";
import { useAudioStore } from "../../stores/audioStore";
import { useChatStore } from "../../stores/chatStore";

import { shallow } from "zustand/shallow";

import { Text } from "./Text.jsx";

// import url from "../../public/video/video.mp4";

const Video = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/video/video.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playbackRate = 1;
    vid.play();
    return vid;
  });
  return (
    <>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -5]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial emissive={"white"}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

const Analyzer = ({ sound, scene }) => {
  const meshRef = useRef();
  const analyser = useRef();
  const light1Ref = useRef();
  const light2Ref = useRef();
  const htmlRef = useRef();

  useEffect(() => {
    // console.log(sound.current);

    analyser.current = new THREE.AudioAnalyser(sound.current, 128);
  });
  const frequencyDataArray = [];

  const [sceneSpeed] = useSceneStore((state) => [state.sceneSpeed], shallow);

  // function Foo({ vec = new THREE.Vector(), ...props }) {
  //   useFrame(() => {
  //     ref.current.position.lerp(vec.set(x, y, z), 0.1);
  //   });
  // }

  const vector = (x, y, z) => {
    return new THREE.Vector3(x, y, z);
  };

  const vec = new THREE.Vector3();
  useFrame(() => {
    const averageFrequency = analyser.current.getAverageFrequency();
    frequencyDataArray = analyser.current.getFrequencyData();

    const kickArray = frequencyDataArray.slice(0, 10);
    const lowFreqArray = frequencyDataArray.slice(
      0,
      frequencyDataArray.length / 3 - 1
    );
    const midFreqArray = frequencyDataArray.slice(
      (frequencyDataArray.length / 3) - 1,
      (frequencyDataArray.length / 3) * 2 - 1
    );
    const highFreqArray = frequencyDataArray.slice(
      (frequencyDataArray.length / 3) * 2 - 1,
      frequencyDataArray.length - 1
    );

    // const overalAvg = avg(frequencyDataArray);
    // console.log(overalAvg, averageFrequency);

    // console.log(averageFrequency, frequencyDataArray.slice(0, 10)[0]);

    const min = (calc, minValue) => {
      return calc < minValue ? minValue : calc;
    };
    const max = (calc, minValue) => {
      return calc > minValue ? minValue : calc;
    };
    const zoom = min(avg(kickArray) / 100, 0.7);

    // Edit elements
    // meshRef.current.scale.lerp(vec.set(zoom, zoom, zoom), 0.15);
    meshRef.current.scale.lerp(vec.set(zoom, zoom, zoom), 0.15);
    // Create calulculation but element cannot go lower than 1

    scene.current.rotation.y -= avg(kickArray) / (100000 / sceneSpeed);
    light1Ref.current.intensity = max(avg(kickArray) / 40, 5);
    light2Ref.current.intensity = max(avg(kickArray) / 40, 5);
    // console.log( avg(lowerHalfArray)/20)
    // htmlRef.current.innerHTML = Math.round(zoom * 100, 2) / 100;
  });
  return (
    <>
      <pointLight
        ref={light1Ref}
        intensity={0}
        position={[5, 5, 5]}
        color="blue"
      />
      <pointLight
        ref={light2Ref}
        intensity={0}
        position={[-5, 5, 5]}
        color="green"
      />

      <mesh ref={meshRef} scale={1}>
        <Heart position={[0, 0, 0]}></Heart>
        {/* <MeshWobbleMaterial
          attach="material"
          factor={1} // Strength, 0 disables the effect (default=1)
          speed={10} // Speed (default=1)
        /> */}
        {/* <Html>
          <div className="w-[200px] bg-red-500 flex">
            Current size
            <span ref={htmlRef}>0</span>
          </div>
        </Html> */}
      </mesh>
      <TransformControls object={meshRef} mode="translate"></TransformControls>
      {/* <group position={[2, 2, 0.1]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} />
          <meshStandardMaterial attach="material" color={0xf95b3c} />
        </mesh>
      </group> */}
    </>
  );
};

export const SceneObjects = () => {
  const bounceRef = useRef();
  const sceneRef = useRef();
  const soundRef = useRef();
  const starsRef = useRef();
  const { camera } = useThree();

  const [seconds, setSeconds] = useState(0);

  const [stars, starSize] = useObjectStore(
    (state) => [state.stars, state.starSize],
    shallow
  );
  const [
    audioUrl,
    audioStart,
    audioPlay,
    audioName,

    setAudioPlay,
    setAudioStart,
    setAudioLength,
    setAudioCurrentTime,
  ] = useAudioStore(
    (state) => [
      state.audioUrl,
      state.audioStart,
      state.audioPlay,
      state.audioName,

      state.setAudioPlay,
      state.setAudioStart,
      state.setAudioLength,
      state.setAudioCurrentTime,
    ],
    shallow
  );
  const [messages] = useChatStore((state) => [state.messages], shallow);

  useFrame(({ clock }, x) => {
    bounceRef.current.rotation.y += 0.01;
    // sceneRef.current.rotation.y -= 0.001;
    // round to 2 decimal places

    // Every second of render loop
    // if (Math.round((clock * 3600) % 60) == 0) {
    //   // setSeconds(seconds + 1);

    //   console.log(seconds);
    //   // console.log(camera);
    // }
    // if(Math.round(x*100)) {
    //   console.log(Math.round(x*100)/100);
    // }
    //   console.log(Math.round(x*100)/100);
    // console.log(Math.sin(clock.getElapsedTime()));
    // console.log(clock,x)
    // camera.position.x += 0.2
    // camera.position.y += 0.2
    // camera.position.z += 0.2
  });

  useEffect(() => {
    console.log("✅ Audio Loaded");
    if (!soundRef.current) return;
    setAudioLength(Math.floor(soundRef.current.buffer.duration));
    setAudioCurrentTime(0);
    setSeconds(0);
  }, [audioUrl]);

  useEffect(() => {
    console.log("✨ " + stars + " stars rendering");
  }, [stars]);

  // timer that ticks every second

  // const seconds = 0;
  // useEffect(() => {
  //   // setAudioCurrentTime(0)
  //   // setSeconds(0);
  //   const timer = setInterval(() => {
  //     if (audioPlay) {
  //       setSeconds(seconds + 1);
  //       setAudioCurrentTime(seconds + 1);
  //       // addAudioCurrentTime()
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // });

  useEffect(() => {
    if (audioPlay) setAudioStart(true);

    if (!soundRef.current) return;
    playAudio();

    // Get currenttime from audiocontext
    // if (!soundRef.current) return;
    // console.log(soundRef.current.context.currentTime);
    // console.log(soundRef.current.getOutput());
    // console.log(soundRef.current);
    // get currenttime from positionAudio threejs
    // console.log(soundRef.current.context.currentTime);
    // calculate currenttime from positionalaudio threejs
  }, [audioPlay]);

  useEffect(() => {
    if (!soundRef.current) return;
    playAudio();
    setAudioLength(Math.floor(soundRef.current.buffer.duration));
  }, [audioStart]);

  const playAudio = () => {
    if (audioPlay) {
      soundRef.current.play();
      console.log("⏯ Audio playing");
    } else {
      soundRef.current.pause();
      console.log("⏸ Audio paused");
    }
  };

  const nodesCubes = ["hi", "hi", "hi", "hi", "yo", "xp", "ahha"].map(
    (el, i) => {
      return (
        <Box key={i} position={[i + 2, 0, 0]}>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
        </Box>
      );
    }
  );
  return (
    <>
      {/* <Html>{seconds}</Html> */}
      <group>
        {nodesCubes}
        {/* {["hi", "hi", "hi", "hi"].map((el, i) => {
          console.log("hi");
          return <Video key={i}></Video>;
        })} */}
        {/* <Video></Video>; */}
      </group>
      {audioStart ? (
        <>
          <PositionalAudio
            url={audioUrl}
            ref={soundRef}
            onEnded={() => setAudioPlay(false)}
            distance={1}
          />
          <Analyzer sound={soundRef} scene={sceneRef} />
        </>
      ) : null}

      {/* <Sky
        distance={450000}
        sunPosition={[0, 0.3, 0]}
        inclination={0}
        azimuth={0.25}
      /> */}
      {/* <Environment preset="sunset" background /> */}
      {/* <Environment files="/spaces/studio_small_03_4k.pic" background /> */}

      <Text hAlign="center" position={[0, 3, -50]}>
        {audioName}
      </Text>
      <Text hAlign="center" position={[0, 0, -25]} fontSize={10}>
        {messages[messages.length - 1].message}
      </Text>
      {/* <Text hAlign="center" position={[0, 3, -50]} children={audioName} /> */}
      {/* <Text hAlign="right" position={[-12, 3, -25]} children="Memories" /> */}
      <mesh ref={sceneRef}>
        {/* Song Title */}
        {/* @ts-ignore */}
        {/* <Text color="black" anchorX="center" anchorY="middle">
        hello world!
      </Text> */}
        {/* <Text
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        hello world!
      </Text> */}

        {/* <Billboard
        follow={true} // Follow the camera (default=true)
        lockX={false} // Lock the rotation on the x axis (default=false)
        lockY={false} // Lock the rotation on the y axis (default=false)
        lockZ={false} // Lock the rotation on the z axis (default=false)
        animations={undefined}
        removeFromParent={undefined}
      /> */}

        <Stars
          ref={starsRef}
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={stars} // Amount of stars (default=5000)
          factor={starSize} // Size factor (default=4)
          saturation={1} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        {/* {["yes", "no", "maybe"].map((key, index) => {
          console.log(key);
          return (
            <Box key={key} position={[index, 0, 0]}>
              <meshPhongMaterial attach="material" color="#f3f3f3" />
            </Box>
          );
        })} */}
        {/* <Box position={[1, 1, 1]}>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
        </Box> */}

        {/* <mesh
          position={new THREE.Vector3(2, 2, 2)}
          onClick={() => {
            // setPlayVideo(true);
            // setAudioPlay(true);
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial />
        </mesh> */}

        <mesh ref={bounceRef}>{/* <Heart></Heart> */}</mesh>
        {/* <mesh position={new THREE.Vector3(-4, -3, 2)}>
          <Bugatti></Bugatti>
        </mesh> */}
        {/* <mesh position={new THREE.Vector3(0, 0, 0)}> */}
        {/* <Cubes></Cubes> */}
        {/* </mesh> */}
        <mesh position={new THREE.Vector3(0, 0, -5)}>
          {/* <Diodes></Diodes> */}
        </mesh>
        <mesh position={new THREE.Vector3(3, 3, 3)}>
          {/* <Cube></Cube> */}
          {/* <Rainbow></Rainbow> */}
        </mesh>
        <mesh position={new THREE.Vector3(-3, -3, -3)}>
          {/* <Orb></Orb> */}
        </mesh>
        <fog attach="fog" args={["white", 0, 5]} />
      </mesh>
    </>
  );
};
