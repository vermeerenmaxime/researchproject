import {
  Billboard,
  Environment,
  Stars,
  Sky,
  PositionalAudio,
  Box,
  Html,
} from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import Heart from "./models/Heart.js";
import Bugatti from "./models/Bugatti.js";
import Cubes from "./models/Cubes.js";
import Diodes from "./models/Diodes.js";
import Orb from "./models/Orb.js";
import Cube from "./models/Cube.js";
import Rainbow from "./models/Rainbow.js";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
// @ts-ignore
import { BlendFunction } from "postprocessing";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { avg } from "../utils/calculations";
import { useObjectStore } from "../stores/objectStore";
import { useSceneStore } from "../stores/sceneStore";
import { useAudioStore } from "../stores/audioStore";

import { shallow } from "zustand/shallow";

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
    console.log("✅ Audio Loaded");
    analyser.current = new THREE.AudioAnalyser(sound.current, 128);
  });
  const frequencyDataArray = [];

  const [sceneSpeed] = useSceneStore((state) => [state.sceneSpeed], shallow);

  // function Foo({ vec = new THREE.Vector3(), ...props })

  useFrame(() => {
    const averageFrequency = analyser.current.getAverageFrequency();
    frequencyDataArray = analyser.current.getFrequencyData();

    const kickArray = frequencyDataArray.slice(0, 10);
    const lowerHalfArray = frequencyDataArray.slice(
      0,
      frequencyDataArray.length / 2 - 1
    );
    const upperHalfArray = frequencyDataArray.slice(
      frequencyDataArray.length / 2 - 1,
      frequencyDataArray.length - 1
    );

    // const overalAvg = avg(frequencyDataArray);
    // console.log(overalAvg, averageFrequency);

    // console.log(averageFrequency, frequencyDataArray.slice(0, 10)[0]);

    // number cannot go lower than 3
    //  const zoom = avg(kickArray) / 100;
    // console.log(avg(kickArray) / 100);
    const min = (calc, minValue) => {
      return calc < minValue ? minValue : calc;
    };
    const max = (calc, minValue) => {
      return calc > minValue ? minValue : calc;
    };
    const zoom = min(avg(kickArray) / 100, 0.7);

    // Edit elements
    // meshRef.current.scale.lerp(vec.set(zoom, zoom, zoom), 0.15);
    meshRef.current.scale.lerp(new THREE.Vector3(zoom, zoom, zoom), 0.15);
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
        {/* <Html>
          <div className="w-[200px] bg-red-500 flex">
            Current size
            <span ref={htmlRef}>0</span>
          </div>
        </Html> */}
      </mesh>
      <group position={[2, 2, 0.1]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} />
          <meshStandardMaterial attach="material" color={0xf95b3c} />
        </mesh>
      </group>
    </>
  );
};

export const SceneObjects = () => {
  const bounceRef = useRef();
  const sceneRef = useRef();
  const soundRef = useRef();
  const starsRef = useRef();
  const { camera } = useThree();

  const [stars] = useObjectStore((state) => [state.stars], shallow);
  const [audioUrl] = useAudioStore((state) => [state.audioUrl], shallow);

  useFrame((smth, x) => {
    bounceRef.current.rotation.y += 0.01;
    // sceneRef.current.rotation.y -= 0.001;
    // round to 2 decimal places

    // Every second of render loop
    if (Math.round((x * 3600) % 60) == 0) {
      // console.log(camera);
    }
    // camera.position.x += 0.2
    // camera.position.y += 0.2
    // camera.position.z += 0.2
    // if (playVideo) console.log(soundRef.current);
    // if (playVideo) console.log(soundRef.current.listener);
  });

  useEffect(() => {
    // starsRef.current.
    console.log("Audio url loaded");
    // setMusicUrl(audioUrl);
  }, [audioUrl]);
  useEffect(() => {
    // starsRef.current.
    console.log("✨ " + stars + " stars rendering");
  }, [stars]);

  const [playVideo, setPlayVideo] = useState(false);

  // useEffect(() => {
  //   setMusicUrl(audioUrl);
  //   // setMusicUrl("/audio/lightswitch.mp3");
  // }, [playVideo]);

  const nodesCubes = ["hi", "hi", "hi", "hi", "yo", "xp", "ahha"].map(
    (el, i) => {
      // console.log("hi");
      return (
        <Box key={i} position={[i + 2, 0, 0]}>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
        </Box>
      );
    }
  );
  return (
    <>
      <group>
        {nodesCubes}
        {/* {["hi", "hi", "hi", "hi"].map((el, i) => {
          console.log("hi");
          return <Video key={i}></Video>;
        })} */}
        {/* <Video></Video>; */}
      </group>
      {playVideo ? (
        <>
          <PositionalAudio
            autoplay
            url={audioUrl}
            ref={soundRef}
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
          factor={10} // Size factor (default=4)
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
        <Box position={[1, 1, 1]}>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
        </Box>

        <mesh
          position={new THREE.Vector3(2, 2, 2)}
          onClick={() => setPlayVideo(true)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial />
        </mesh>

        <mesh ref={bounceRef}>{/* <Heart></Heart> */}</mesh>
        {/* <mesh position={new THREE.Vector3(-4, -3, 2)}>
          <Bugatti></Bugatti>
        </mesh> */}
        <mesh position={new THREE.Vector3(0, 0, 0)}>
          {/* <Cubes></Cubes> */}
        </mesh>
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
        <fog attach="fog" args={["white", 0, 100]} />
      </mesh>
    </>
  );
};
