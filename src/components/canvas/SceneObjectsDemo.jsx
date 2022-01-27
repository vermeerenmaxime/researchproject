import { PositionalAudio } from "@react-three/drei";

import { useRef } from "react";

import Corridor from "../models/Corridor.js";

const Analyzer = ({ sound }) => {
  const meshRef = useRef();
  const analyser = useRef();

  useEffect(() => {
    analyser.current = new THREE.AudioAnalyser(sound.current, 128);
  });

  const min = (calc, minValue) => {
    return calc < minValue ? minValue : calc;
  };

  const avg = (array) => {
    return Math.floor(array.reduce((a, b) => a + b, 0) / array.length);
  };

  const frequencyDataArray = [];
  const vec = new THREE.Vector3();

  useFrame(() => {
    frequencyDataArray = analyser.current.getFrequencyData();

    const kickArray = frequencyDataArray.slice(0, 10);
    const zoom = min(avg(kickArray) / 100, 0.7);

    meshRef.current.scale.lerp(vec.set(zoom, zoom, zoom), 0.15);
  });

  return (
    <>
      <mesh ref={meshRef} scale={1}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

const SceneObjects = () => {
  const soundRef = useRef();
  const [audioStart, setAudioPlay] = useAudioStore(
    (state) => [state.audioStart, state.setAudioPlay],
    shallow
  );

  const playAudio = () => {
    if (audioPlay) {
      soundRef.current.play();
      console.log("⏯ Audio playing");
    } else {
      soundRef.current.pause();
      console.log("⏸ Audio paused");
    }
  };

  useEffect(() => {
    if (audioPlay) setAudioStart(true);
    if (!soundRef.current) return;
    playAudio();
  }, [audioPlay]);

  useEffect(() => {
    if (!soundRef.current) return;
    playAudio();
  }, [audioStart]);

  useEffect(() => {
    return () => {
      setAudioStart(false);
      setAudioPlay(false);
    };
  }, []);

  return (
    <>
      {audioStart ? (
        <>
          <PositionalAudio
            url={"/audio/memories.mp3"}
            ref={soundRef}
            onEnded={() => setAudioPlay(false)}
            distance={1}
          />
          <Analyzer sound={soundRef} />
        </>
      ) : null}
      <mesh scale={0.5} position={[0, 0, 0]}>
        <Corridor></Corridor>
      </mesh>
    </>
  );
};
