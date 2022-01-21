/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: DJS (https://sketchfab.com/s.jailen.jones)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/bugatti-chiron-251f937a372f41b48a971af814c28149
title: Bugatti Chiron
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/gltf/bugatti.gltf')
  return (
    <group ref={group} {...props} dispose={null} scale={.03}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <lineSegments geometry={nodes.Material4.geometry} material={nodes.Material4.material} />
        <lineSegments geometry={nodes.Material3_1.geometry} material={nodes.Material3_1.material} />
        <lineSegments geometry={nodes.Material3_2.geometry} material={nodes.Material3_2.material} />
        <lineSegments geometry={nodes.Material3_4.geometry} material={nodes.Material3_4.material} />
        <lineSegments geometry={nodes.Material4_2.geometry} material={nodes.Material4_2.material} />
        <mesh geometry={nodes.Material2.geometry} material={materials.Color_M04} />
        <mesh geometry={nodes.Material3.geometry} material={materials.material} />
        <mesh geometry={nodes.Material2_1.geometry} material={materials.Chiron_42_GlassMtl} />
        <mesh geometry={nodes.Material2_2.geometry} material={materials.Chiron_42_Coloured} />
        <mesh geometry={nodes.Material2_3.geometry} material={materials.Chiron_42_GlassRedMtl} />
        <mesh geometry={nodes.Material2_4.geometry} material={materials.Chiron_42_Paint0} />
        <mesh geometry={nodes.Material2_5.geometry} material={materials.Chiron_42_LiveryA} />
        <mesh geometry={nodes.Material4_1.geometry} material={materials.Chiron_42_LiveryA_1} />
        <mesh geometry={nodes.Material3_3.geometry} material={materials.Chiron_42_LiveryA_0} />
        <mesh geometry={nodes.Material2_6.geometry} material={materials.Chiron_42_Lights} />
        <mesh geometry={nodes.Material2_7.geometry} material={nodes.Material2_7.material} />
        <mesh geometry={nodes.Material2_8.geometry} material={nodes.Material2_8.material} />
        <mesh geometry={nodes.Material2_9.geometry} material={materials.Chiron_42_color2} />
        <mesh geometry={nodes.Material3_5.geometry} material={materials.Chiron_42_interior_o_2} />
        <mesh geometry={nodes.Material2_10.geometry} material={materials.Chiron_42_Grille4A} />
        <mesh geometry={nodes.Material2_11.geometry} material={materials.Chiron_42_color2_o} />
        <mesh geometry={nodes.Material2_12.geometry} material={materials.Chiron_42_interior_o} />
        <mesh geometry={nodes.Material2_13.geometry} material={materials.Chiron_42_Grille3A} />
        <mesh geometry={nodes.Material2_14.geometry} material={materials.Chiron_42_Grille2A} />
        <mesh geometry={nodes.Material2_15.geometry} material={materials.Chiron_42_Grille1A} />
        <mesh geometry={nodes.Material3_6.geometry} material={materials.metal_01} />
        <mesh geometry={nodes.Material2_16.geometry} material={materials.Chiron_42_Carbon1} />
        <mesh geometry={nodes.Material2_17.geometry} material={materials.Chiron_42_Base} />
        <mesh geometry={nodes.Material2_18.geometry} material={materials.Chiron_42_BadgeA} />
        <mesh geometry={nodes.Material2_19.geometry} material={nodes.Material2_19.material} />
        <mesh geometry={nodes.Material2_20.geometry} material={nodes.Material2_20.material} />
        <mesh geometry={nodes.Material3_7.geometry} material={materials.Chiron_42_Wheel1A_3} />
        <mesh geometry={nodes.Material3_8.geometry} material={materials.Chiron_42_Wheel1A_5} />
        <mesh geometry={nodes.Material3_9.geometry} material={materials.Chiron_42_Wheel1A_4} />
        <mesh geometry={nodes.Material2_21.geometry} material={materials.Chiron_42_ColouredMtl} />
        <mesh geometry={nodes.Material2_22.geometry} material={materials.Chiron_42_CalliperBadgeBMtl} />
        <mesh geometry={nodes.Material2_23.geometry} material={materials.Chiron_42_paint1Mtl} />
      </group>
    </group>
  )
}

useGLTF.preload('/gltf/bugatti.gltf')
