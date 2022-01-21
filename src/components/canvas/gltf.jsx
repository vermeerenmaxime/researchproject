import * as THREE from "three";

import { extend, useLoader, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

export const GLTF = ({ props }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  //   const font = useLoader(FontLoader, "/fonts/Montserrat_Bold.json");
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    "/unformat/scene.gltf"
  );

  //   const { nodes, materials } = useGLTF("/unformat/scene.gltf");
  const [start] = useState(() => Math.random() * 5000);
  const [mixer] = useState(() => new THREE.AnimationMixer());
//   useEffect(
//     () => void mixer.clipAction(animations[0], groupRef.current).play(),
//     []
//   );

  useEffect(() => {
    console.log(nodes, materials);
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <scene>
        <mesh ref={meshRef}>
          {/* <mesh material={materials['Material.001']} geometry={(nodes.Suzanne as Mesh).geometry} /> */}
          {/* <textGeometry args={[children, config]} center={true} /> */}
          {/* <meshPhongMaterial /> */}
          {/* <meshPhysicalMaterial /> */}
          {/* <meshStandardMaterial /> */}
        </mesh>
      </scene>
    </group>
  );
};
