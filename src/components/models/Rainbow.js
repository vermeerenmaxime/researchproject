/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: SenYul (https://sketchfab.com/senyul)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/rainbow-morph-animation-18c96b42cf7d433ca72df475cd6ec4d8
title: Rainbow morph animation
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

export default function Model({ ...props }) {
  const group = useRef();
  
  const { nodes, materials, animations } = useGLTF("/gltf/rainbow.gltf");
  const { actions, mixer, clips } = useAnimations(animations, group);

  // useEffect(() => {
  // //   // console.log(actions);
  //   actions.animation_0.play();
  // //   console.log(group.current.children[0].children[0]);

  // //   // Object.keys(actions).forEach((action) => actions[action].play());
  // });

  // useFrame((scene, delta) => {
  //   mixer?.update(delta);
  // });

  // const actions = useRef();
  // const [mixer] = useState(() => new THREE.AnimationMixer());
  let i = 1;
  useFrame((state, delta) => {
    // console.log(delta)
    if (i == 60) i = 1;
    else i += 1;
    // if (i % 20 == 0) {
    // console.log(i);
    mixer.update(delta);
    // }
  });

  useEffect(() => {
    group.current.uuid = "23df8efc-f1bc-4189-aa4f-e00a66604565"
    // actions.current = {
    //   idle: mixer.clipAction(animations[0], group.current),
    // };
    // actions.current.idle.play();
    // Object.keys(actions).forEach((action) => actions[action].play());
    // console.log(mixer.update(10))
    // Play a specific animation
    // const clip = THREE.AnimationClip.findByName(clips, "animation_0");
    // console.log(clip)
    // // clip.uuid = "23df8efc-f1bc-4189-aa4f-e00a66604565"


    // // delete clip.uuid
    // const action = mixer.clipAction(animations[ 0 ],group.current);
    // console.log(clip)
    // action.play();

    // Play all animations
    clips.forEach(function (clip) {
      mixer.clipAction(clip,group.current).play();
    });

    // return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* <primitive ref={group} name="Object_0" object={nodes["RootNode"]} /> */}
      <group  rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_0.geometry}
            material={materials.Material_98}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_1.geometry}
            material={materials.Material_97}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_2.geometry}
            material={materials.Material_96}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_3.geometry}
            material={materials.Material_95}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_4.geometry}
            material={materials.Material_94}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_5.geometry}
            material={materials.Material_93}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_6.geometry}
            material={materials.Material_92}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_7.geometry}
            material={materials.Material_91}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_8.geometry}
            material={materials.Material_90}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_9.geometry}
            material={materials.Material_89}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_10.geometry}
            material={materials.Material_88}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_11.geometry}
            material={materials.Material_87}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_12.geometry}
            material={materials.Material_86}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_13.geometry}
            material={materials.Material_85}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_14.geometry}
            material={materials.Material_84}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_15.geometry}
            material={materials.Material_83}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_16.geometry}
            material={materials.Material_82}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_17.geometry}
            material={materials.Material_81}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_18.geometry}
            material={materials.Material_80}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_19.geometry}
            material={materials.Material_79}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_20.geometry}
            material={materials.Material_78}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_21.geometry}
            material={materials.Material_77}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_22.geometry}
            material={materials.Material_76}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_23.geometry}
            material={materials.Material_75}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_24.geometry}
            material={materials.Material_74}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_25.geometry}
            material={materials.Material_73}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_26.geometry}
            material={materials.Material_72}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_27.geometry}
            material={materials.Material_71}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_28.geometry}
            material={materials.Material_70}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_29.geometry}
            material={materials.Material_69}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_30.geometry}
            material={materials.Material_68}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_31.geometry}
            material={materials.Material_67}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_32.geometry}
            material={materials.Material_66}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_33.geometry}
            material={materials.Material_65}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_34.geometry}
            material={materials.Material_63}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_35.geometry}
            material={materials.Material_62}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_36.geometry}
            material={materials.Material_61}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_37.geometry}
            material={materials.Material_60}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_38.geometry}
            material={materials.Material_59}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_39.geometry}
            material={materials.Material_58}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_40.geometry}
            material={materials.Material_57}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_41.geometry}
            material={materials.Material_56}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_42.geometry}
            material={materials.Material_55}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_43.geometry}
            material={materials.Material_54}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_44.geometry}
            material={materials.Material_53}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_45.geometry}
            material={materials.Material_52}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_46.geometry}
            material={materials.Material_51}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_47.geometry}
            material={materials.Material_50}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_48.geometry}
            material={materials.Material_49}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_49.geometry}
            material={materials.Material_48}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_50.geometry}
            material={materials.Material_47}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_51.geometry}
            material={materials.Material_46}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_52.geometry}
            material={materials.Material_45}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_53.geometry}
            material={materials.Material_44}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_54.geometry}
            material={materials.Material_43}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_55.geometry}
            material={materials.Material_42}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_56.geometry}
            material={materials.Material_41}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_57.geometry}
            material={materials.Material_40}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_58.geometry}
            material={materials.Material_39}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_59.geometry}
            material={materials.Material_38}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_60.geometry}
            material={materials.Material_37}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_61.geometry}
            material={materials.Material_36}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_62.geometry}
            material={materials.Material_35}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_63.geometry}
            material={materials.Material_34}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_64.geometry}
            material={materials.Material_33}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_65.geometry}
            material={materials.Material_32}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_66.geometry}
            material={materials.Material_64}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_67.geometry}
            material={materials.Material_31}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_68.geometry}
            material={materials.Material_30}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_69.geometry}
            material={materials.Material_29}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_70.geometry}
            material={materials.Material_28}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_71.geometry}
            material={materials.Material_27}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_72.geometry}
            material={materials.Material_26}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_73.geometry}
            material={materials.Material_25}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_74.geometry}
            material={materials.Material_24}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_75.geometry}
            material={materials.Material_23}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_76.geometry}
            material={materials.Material_22}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_77.geometry}
            material={materials.Material_21}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_78.geometry}
            material={materials.Material_20}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_79.geometry}
            material={materials.Material_19}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_80.geometry}
            material={materials.Material_18}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_81.geometry}
            material={materials.Material_17}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_82.geometry}
            material={materials.Material_16}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_83.geometry}
            material={materials.Material_15}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_84.geometry}
            material={materials.Material_14}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_85.geometry}
            material={materials.Material_13}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_86.geometry}
            material={materials.Material_12}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_87.geometry}
            material={materials.Material_11}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_88.geometry}
            material={materials.Material_10}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_89.geometry}
            material={materials.Material_9}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_90.geometry}
            material={materials.Material_8}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_91.geometry}
            material={materials.Material_7}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_92.geometry}
            material={materials.Material_6}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_93.geometry}
            material={materials.Material_5}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_94.geometry}
            material={materials.Material_4}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_95.geometry}
            material={materials.Material_3}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_96.geometry}
            material={materials.Material_2}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_97.geometry}
            material={materials.Material_1}
          />
        </group>
        <group scale={0}>
          <mesh
            geometry={nodes.mesh_98.geometry}
            material={materials.Material_0}
          />
        </group>
        <mesh geometry={nodes.mesh_99.geometry} material={materials.Material} />
      </group>
    </group>
  );
}

useGLTF.preload("/rainbow.gltf");
