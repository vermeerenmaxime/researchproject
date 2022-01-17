import { Reflector, useTexture } from "@react-three/drei";
export const Ground = ({ props }) => {
  const [floor, normal] = useTexture([
    "/textures/surfaceimperfection.jpeg",
    "/textures/surfaceimperfection2.jpeg",
  ]);
  return (
    <Reflector resolution={1024} args={[100, 100]} {...props}>
      {(Material, props) => (
        <Material
          color="#f0f0f0"
          metalness={0.9}
          roughnessMap={floor}
          normalMap={normal}
          //@ts-ignore
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
};
