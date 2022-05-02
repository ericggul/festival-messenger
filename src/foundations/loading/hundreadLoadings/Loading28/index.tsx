import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky, CameraShake, Environment, Instances, Instance, OrbitControls } from "@react-three/drei";

import Texture from "./texture.png";
import * as S from "./styles";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
    interface bufferAttribute {
      attachObject: any;
    }
  }
}

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Text = () => {
  extend({ TextGeometry });
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 30,
      height: 10,
      curveSegments: 10,
      // bevelEnabled: true,
    }),
    [font]
  );

  return (
    <mesh position={[-80, 0, 0]}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshStandardMaterial attach="material" color={"pink"} />
    </mesh>
  );
};

// const Rain = () => {
//   const LENGTH = 100;

//   const [vertices, setVertices] = useState<Float32Array>();
//   const [colors, setColors] = useState<Float32Array>();
//   return (
//     <points>
//       <bufferGeometry attach="geometry">
//         {vertices && <bufferAttribute attachObject={["attributes", "position"]} array={vertices} count={LENGTH} itemSize={3} />}
//         {colors && <bufferAttribute attachObject={["attributes", "color"]} array={colors} count={LENGTH} itemSize={3} />}
//       </bufferGeometry>
//       <pointsMaterial size={0.02} attach="material" vertexColors={true} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
//     </points>
//   );
// };

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 60, position: [0, 0, 200], near: 1, far: 1000 }}>
        <ambientLight color={0x555555} />
        <directionalLight color={0xffeedd} position={[0, 0, 1]} />
        <pointLight color={"rgb(230, 0, 220)"} position={[200, 300, 100]} intensity={30} distance={500} decay={1.7} />
        <Suspense fallback={null}>
          <Environment preset="apartment" />
        </Suspense>

        <Text />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
export default Loading;
