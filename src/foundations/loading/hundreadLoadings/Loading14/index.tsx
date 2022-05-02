import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky, CameraShake, Cloud, Environment, Instances, Instance, OrbitControls } from "@react-three/drei";

import Texture from "@I/loading/texture.png";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getFloorRandom = (a: number, b: number) => Math.floor(Math.random() * (b - a) + a);
declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const LENGTH = 200;

const Text = ({ idx }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();

  const angle = ((idx % 12) * Math.PI) / 6;
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.set(30 * Math.cos(angle), 20 - idx * 0.4, 30 * Math.sin(angle));
    ref.current.rotation.set(t * 3 + idx * 0.1, 0, 0);
  });

  return <Instance ref={ref} />;
};

const Texts = () => {
  extend({ TextGeometry });
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 0.3,
      height: 0.1,
      bevelEnabled: true,
    }),
    [font]
  );

  return (
    <Instances limit={LENGTH}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshPhongMaterial attach="material" color={"white"} />
      {new Array(LENGTH).fill(0).map((_: any, i: number) => (
        <Text key={i} idx={i} />
      ))}
    </Instances>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 30, 0] }}>
        <ambientLight intensity={0.8} />
        <fog attach="fog" args={["hotpink", 4, 200]} />
        <directionalLight intensity={2.5} color={"pink"} position={[0, 0, 20]} />
        <Suspense fallback={null}>
          <Texts />
          <Environment preset="apartment" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
export default Loading;
