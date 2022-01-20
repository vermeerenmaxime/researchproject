import * as THREE from "three";

import { extend, useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

export const Text = ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  fontSize = 40,
  ...props
}) => {
  // const font = new THREE.FontLoader().parse("/fonts/montserrat.js");
  // const jsonParsed = JSON.parse(JSON.stringify(Montserrat));
  // console.log(jsonParsed);
  // const loader = new THREE.FontLoader();
  // console.log(loader);
  // const font = useLoader(FontLoader, "/fonts/bold.blob");
  const font = useLoader(FontLoader, "/fonts/montserrat.json");
  // const font = useLoader(FontLoader, "/fonts/Reglo_Regular.json");
  const config = useMemo(
    () => ({
      font,
      size: fontSize,
      height: 30,
      curveSegments: 50,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font, fontSize]
  );

  const mesh = useRef();

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};
