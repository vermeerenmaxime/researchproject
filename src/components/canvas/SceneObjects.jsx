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
  GradientTexture,
} from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import Heart from "../models/Heart.js";
import Bugatti from "../models/Bugatti.js";
import Cubes from "../models/Cubes.js";
import Diodes from "../models/Diodes.js";
import Orb from "../models/Orb.js";
import Cube from "../models/Cube.js";
import Rainbow from "../models/Rainbow.js";

import Corridor from "../models/Corridor.js";
import Explorer from "../models/Explorer.js";
import Moon from "../models/Moon.js";

import Spaceman from "../models/Spaceman.js";
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
import { useThemeStore } from "../../stores/themeStore";
import { useEditorStore } from "../../stores/editorStore";

import { shallow } from "zustand/shallow";

import { Text } from "./Text.jsx";
import { NormalText } from "./NormalText.jsx";
import { GLTF } from "./gltf.jsx";
// import { Lightmountain } from "../models/Lightmountain.js";

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

const Analyzer = ({ sound, scene, props }) => {
  const meshRef = useRef();
  const analyser = useRef();
  const light1Ref = useRef();
  const light2Ref = useRef();
  const htmlRef = useRef();

  useEffect(() => {
    analyser.current = new THREE.AudioAnalyser(sound.current, 128);
  });
  const frequencyDataArray = [];

  const [sceneSpeed, pointLight1, pointLight2] = useSceneStore(
    (state) => [state.sceneSpeed, state.pointLight1, state.pointLight2],
    shallow
  );
  const [mainObjectPosition, setMainObjectPosition] = useObjectStore(
    (state) => [state.mainObjectPosition, state.setMainObjectPosition],
    shallow
  );

  const [theme] = useThemeStore((state) => [state.theme], shallow);

  const [mode] = useEditorStore((state) => [state.mode], shallow);
  const [kickFreq, lowFreq, midFreq, highFreq] = useAudioStore(
    (state) => [state.kickFreq, state.lowFreq, state.midFreq, state.highFreq],
    shallow
  );

  const avgDataRef = useRef();
  const lowDataRef = useRef();
  const midDataRef = useRef();
  const highDataRef = useRef();

  const vec = new THREE.Vector3();
  useFrame(() => {
    const averageFrequency = analyser.current.getAverageFrequency();
    frequencyDataArray = analyser.current.getFrequencyData();

    const kickArray = frequencyDataArray.slice(kickFreq[0], kickFreq[1]);
    const lowFreqArray = frequencyDataArray.slice(lowFreq[0], lowFreq[1]);
    const midFreqArray = frequencyDataArray.slice(midFreq[0], midFreq[1]);
    const highFreqArray = frequencyDataArray.slice(highFreq[0], highFreq[1]);
    // const lowFreqArray = frequencyDataArray.slice(
    //   0,
    //   frequencyDataArray.length / 3 - 1
    // );
    // const midFreqArray = frequencyDataArray.slice(
    //   frequencyDataArray.length / 3 - 1,
    //   (frequencyDataArray.length / 3) * 2 - 1
    // );
    // const highFreqArray = frequencyDataArray.slice(
    //   (frequencyDataArray.length / 3) * 2 - 1,
    //   frequencyDataArray.length - 1
    // );

    avgDataRef.current.innerHTML = Math.floor(averageFrequency);
    lowDataRef.current.innerHTML = avg(lowFreqArray);
    midDataRef.current.innerHTML = avg(midFreqArray);
    highDataRef.current.innerHTML = avg(highFreqArray);

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
    // Create calulculation but element cannot go lower than 1`

    if (theme != "car") {
      scene.current.rotation.y -= avg(midFreqArray) / (100000 / sceneSpeed);
    } else {
      if (props && props.corridor) {
        props.corridor.current.position.z -=
          avg(lowFreqArray) / (5000 / sceneSpeed);
      }
    }

    light1Ref.current.intensity = max(avg(highFreqArray) / 40, 5);
    light2Ref.current.intensity = max(avg(highFreqArray) / 40, 5);
    // console.log( avg(lowerHalfArray)/20)
    // htmlRef.current.innerHTML = Math.round(zoom * 100, 2) / 100;
    // console.log(meshRef.current.position)
  });

  const updateMainObjectPosition = () => {
    setMainObjectPosition([
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
    ]);
  };

  useEffect(() => {
    meshRef.current.position.set(
      mainObjectPosition[0],
      mainObjectPosition[1],
      mainObjectPosition[2]
    );

    // mesh.current.position
  });

  return (
    <>
      <Html center>
        <div className="flex space-x-4 hidden">
          <div ref={avgDataRef}></div>
          <div ref={lowDataRef}></div>
          <div ref={midDataRef}></div>
          <div ref={highDataRef}></div>
        </div>
      </Html>
      <pointLight
        ref={light1Ref}
        intensity={0}
        position={[5, 5, 5]}
        color={pointLight1}
      />
      <pointLight
        ref={light2Ref}
        intensity={0}
        position={[-5, 5, 5]}
        color={pointLight2}
      />

      {/* <ambientLight color="white" position={[0, 15, 0]} intensity={2} /> */}
      {/* <ambientLight  color="0xffffff" intensity={20}/> */}

      <mesh ref={meshRef} scale={1}>
        {theme === "heart" ? (
          <Heart position={[0, 0, 0]}></Heart>
        ) : theme === "space" ? (
          <Moon></Moon>
        ) : theme === "car" ? (
          <Bugatti></Bugatti>
        ) : theme === "explore" ? (
          <Cube scale={0.25} position={[0, 3, 0]}></Cube>
        ) : (
          <></>
        )}
      </mesh>
      {mode === "edit" && (
        <TransformControls
          object={meshRef}
          mode="translate"
          onChange={() => updateMainObjectPosition()}
        ></TransformControls>
      )}
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
    audioGenre,

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
      state.audioGenre,

      state.setAudioPlay,
      state.setAudioStart,
      state.setAudioLength,
      state.setAudioCurrentTime,
    ],
    shallow
  );
  const [messages] = useChatStore((state) => [state.messages], shallow);

  const [theme] = useThemeStore((state) => [state.theme], shallow);

  useFrame(({ clock }, x) => {
    // camera.position.x += 0.2
    // camera.position.y += 0.2
    // camera.position.z += 0.2
    // if (corridorRef.current) corridorRef.current.position.z -= 0.02;
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

  // When component gets destroyed
  useEffect(() => {
    return () => {
      setAudioStart(false);
      setAudioPlay(false);
    };
  }, []);

  const playAudio = () => {
    if (audioPlay) {
      soundRef.current.play();
      console.log("⏯ Audio playing");
    } else {
      soundRef.current.pause();
      console.log("⏸ Audio paused");
    }
  };

  const corridorRef = useRef();

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
      {/* <Text hAlign="center" position={[0, 3, -50]}>
        {audioName}
      </Text> */}
      {/* <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial />
      </mesh> */}
      <NormalText
        hAlign="center"
        position={theme === "car" ? [0, 8, -18] : [0, 8, -70]}
        size={theme === "car" ? 0.1 : 0.25}
        color={theme === "explore" ? "black" : "white"}
      >
        {audioName.toUpperCase()}
      </NormalText>
      <NormalText
        hAlign="center"
        position={theme === "car" ? [0, 0, -10] : [0, 0, -50]}
        fontSize={10}
        color={theme === "explore" ? "black" : "white"}
      >
        {/* {messages[messages.length - 1].message} */}
        {"#" + audioGenre.toUpperCase()}
      </NormalText>
      {/* <Text hAlign="center" position={[0, 3, -50]} children={audioName} /> */}
      {/* <Text hAlign="right" position={[-12, 3, -25]} children="Memories" /> */}

      <mesh ref={sceneRef}>
        {theme === "car" && (
          <group position={[0, 0, -75]}>
            {/* {nodesCubes} */}
            <Video></Video>;
          </group>
        )}
        {audioStart ? (
          <>
            <PositionalAudio
              url={audioUrl}
              ref={soundRef}
              onEnded={() => setAudioPlay(false)}
              distance={1}
            />
            <Analyzer
              sound={soundRef}
              scene={sceneRef}
              props={{ corridor: corridorRef }}
            />
          </>
        ) : null}

        {/* {theme === "explore" && (
          <Sky
            distance={450000}
            sunPosition={[0, 0.3, 0]}
            inclination={0}
            azimuth={0.25}
          
          />
        )} */}
        {/* <mesh>
          <planeGeometry />
          <meshBasicMaterial depthWrite={false}>
            <GradientTexture
              stops={[0, 1]} // As many stops as you want
              colors={["aquamarine", "hotpink"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh> */}
        {theme === "heart" ? (
          <>
            <Environment files={"/spaces/earth.hdr"} background />
          </>
        ) : theme === "explore" ? (
          <>
            <Sky
              distance={450000}
              sunPosition={[0, 0.3, 0]}
              inclination={0}
              azimuth={0.25}
              color={"red"}
            />
            <mesh>
              <Explorer scale={4}></Explorer>
            </mesh>
          </>
        ) : theme === "space" ? (
          <>
            <mesh>
              <Spaceman scale={5} position={[0, -5, 0]}></Spaceman>
            </mesh>
            <mesh position={[0, 5, -10]}>
              <Diodes></Diodes>
            </mesh>
            <mesh position={[10, 5, 5]}>
              <Orb></Orb>
            </mesh>
            <mesh position={[-20, 2, 3]}>
              <Cubes></Cubes>
            </mesh>
            <Environment files={"/spaces/nebula.hdr"} background />
          </>
        ) : theme === "car" ? (
          <mesh scale={25} ref={corridorRef}>
            <Corridor></Corridor>
          </mesh>
        ) : (
          <></>
        )}

        {/* <Text
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        hello world!
      </Text> */}

        <Stars
          ref={starsRef}
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={stars} // Amount of stars (default=5000)
          factor={starSize} // Size factor (default=4)
          saturation={1} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />

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

        {/* <mesh position={new THREE.Vector3(0, 0, 0)}> */}

        {/* </mesh> */}

        {/* <mesh position={new THREE.Vector3(3, 3, 3)}> */}
        {/* <Cube></Cube> */}
        {/* <Rainbow></Rainbow> */}
        {/* </mesh> */}

        <fog attach="fog" args={["white", 0, 5]} />
      </mesh>
    </>
  );
};
