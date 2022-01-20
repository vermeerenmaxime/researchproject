import * as THREE from "three";

import { extend, useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

export const NormalText = ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 0.5,
  color = "#000000",
  fontSize = 40,
  ...props
}) => {
  const font = useLoader(FontLoader, "/fonts/Montserrat_Bold.json");
  // const font = useLoader(FontLoader, "/fonts/Reglo_Regular.json");
  const config = useMemo(
    () => ({
      font,
      size: fontSize * 5,
      height: 5,
      curveSegments: 50,
      material: 1,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2.5,
      bevelSegments: 9,

      extrudeMaterial: 1,
    }),
    [font]
  );

  const mesh = useRef();

  useEffect(() => {
    console.log(mesh.current);
    console.log(mesh.current.geometry.computeBoundingSphere()); // this isn't calculated automatically
    // you need to call it

    console.log(mesh.current.geometry.boundingSphere.center);
    mesh.current.position.x =
      -mesh.current.geometry.boundingSphere.center.x;
  });

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh} castShadow="true">
        <textGeometry args={[children, config]} center={true} />
        {/* <meshPhongMaterial /> */}
        <meshPhysicalMaterial />
        {/* <meshStandardMaterial /> */}
      </mesh>
    </group>
  );
};
