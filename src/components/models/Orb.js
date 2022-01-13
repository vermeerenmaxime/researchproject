/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Tycho Magnetic Anomaly (https://sketchfab.com/Tycho_Magnetic_Anomaly)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/ethereal-orbits-d9b6391633fb46b68faa79e83c9c2eb3
title: Ethereal Orbits
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/gltf/orb.gltf");
  const { actions, clips, mixer } = useAnimations(animations, group);
  // console.log(useAnimations(animations, group));

  useEffect(() => {
    actions.Animation.play();
    // clips.forEach(function (clip) {
    //   mixer.clipAction(clip, group.current).play();
    // });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_4.geometry}
              material={nodes.Object_4.material}
            />
          </group>
          <group scale={1.5}>
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials.FILL}
            />
          </group>
          <group scale={1.5}>
            <mesh
              geometry={nodes.Object_8.geometry}
              material={materials.RING_BASE}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_10.geometry}
              material={nodes.Object_10.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_12.geometry}
              material={nodes.Object_12.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_14.geometry}
              material={nodes.Object_14.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_16.geometry}
              material={nodes.Object_16.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_18.geometry}
              material={nodes.Object_18.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_20.geometry}
              material={nodes.Object_20.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_22.geometry}
              material={nodes.Object_22.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_24.geometry}
              material={nodes.Object_24.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_26.geometry}
              material={nodes.Object_26.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_28.geometry}
              material={nodes.Object_28.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_30.geometry}
              material={nodes.Object_30.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_32.geometry}
              material={nodes.Object_32.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_34.geometry}
              material={nodes.Object_34.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_36.geometry}
              material={nodes.Object_36.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_38.geometry}
              material={nodes.Object_38.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_40.geometry}
              material={nodes.Object_40.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_42.geometry}
              material={nodes.Object_42.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_44.geometry}
              material={nodes.Object_44.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_46.geometry}
              material={nodes.Object_46.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_48.geometry}
              material={nodes.Object_48.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_50.geometry}
              material={nodes.Object_50.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_52.geometry}
              material={nodes.Object_52.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_54.geometry}
              material={nodes.Object_54.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_56.geometry}
              material={nodes.Object_56.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_58.geometry}
              material={nodes.Object_58.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_60.geometry}
              material={nodes.Object_60.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_62.geometry}
              material={nodes.Object_62.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_64.geometry}
              material={nodes.Object_64.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_66.geometry}
              material={nodes.Object_66.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_68.geometry}
              material={nodes.Object_68.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_70.geometry}
              material={nodes.Object_70.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_72.geometry}
              material={nodes.Object_72.material}
            />
          </group>
          <group position={[-1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_74.geometry}
              material={nodes.Object_74.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_76.geometry}
              material={nodes.Object_76.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_78.geometry}
              material={nodes.Object_78.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_80.geometry}
              material={nodes.Object_80.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_82.geometry}
              material={nodes.Object_82.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_84.geometry}
              material={nodes.Object_84.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_86.geometry}
              material={nodes.Object_86.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_88.geometry}
              material={nodes.Object_88.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_90.geometry}
              material={nodes.Object_90.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_92.geometry}
              material={nodes.Object_92.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_94.geometry}
              material={nodes.Object_94.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_96.geometry}
              material={nodes.Object_96.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_98.geometry}
              material={nodes.Object_98.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_100.geometry}
              material={nodes.Object_100.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_102.geometry}
              material={nodes.Object_102.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_104.geometry}
              material={nodes.Object_104.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_106.geometry}
              material={nodes.Object_106.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_108.geometry}
              material={nodes.Object_108.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_110.geometry}
              material={nodes.Object_110.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_112.geometry}
              material={nodes.Object_112.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_114.geometry}
              material={nodes.Object_114.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_116.geometry}
              material={nodes.Object_116.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_118.geometry}
              material={nodes.Object_118.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_120.geometry}
              material={nodes.Object_120.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_122.geometry}
              material={nodes.Object_122.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_124.geometry}
              material={nodes.Object_124.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_126.geometry}
              material={nodes.Object_126.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_128.geometry}
              material={nodes.Object_128.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_130.geometry}
              material={nodes.Object_130.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_132.geometry}
              material={nodes.Object_132.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_134.geometry}
              material={nodes.Object_134.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_136.geometry}
              material={nodes.Object_136.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_138.geometry}
              material={nodes.Object_138.material}
            />
          </group>
          <group scale={0.26}>
            <mesh
              geometry={nodes.Object_140.geometry}
              material={nodes.Object_140.material}
            />
          </group>
          <group position={[1.5, 0, 0]}>
            <mesh
              geometry={nodes.Object_142.geometry}
              material={nodes.Object_142.material}
            />
          </group>
          <group name="home_72" scale={25.99}>
            <group scale={0.67}>
              <mesh
                geometry={nodes.Object_146.geometry}
                material={nodes.Object_146.material}
              />
            </group>
            <group
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[0.67, 0.67, 0.67]}
            >
              <mesh
                geometry={nodes.Object_148.geometry}
                material={nodes.Object_148.material}
              />
            </group>
            <mesh
              geometry={nodes.Object_144.geometry}
              material={materials.material_0}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/orb.gltf");
