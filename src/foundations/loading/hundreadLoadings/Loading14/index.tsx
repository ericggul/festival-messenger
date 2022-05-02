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

const Text = () => {
  const ref = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();
  const xPos = getRandom(-viewport.width / 2, viewport.width / 2);
  const yPos = getRandom(-viewport.height / 2, viewport.height / 2);
  const deltaTime = getRandom(-5, 5);
  const deltaZ = getRandom(0, getRandom(0, 30));

  const rotationX = getRandom(-Math.PI / 12, Math.PI / 12);
  const rotationY = getRandom(-Math.PI / 12, Math.PI / 12);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    ref.current.position.set(xPos - 10, yPos, Math.sin(t * 0.2 + deltaTime) * deltaZ);
    ref.current.rotation.set(rotationX, rotationX, 0);
  });

  return <Instance ref={ref} />;
};

const Texts = () => {
  extend({ TextGeometry });
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 2,
      height: 1,
      curveSegments: 10,
      // bevelEnabled: true,
    }),
    [font]
  );

  return (
    <Instances limit={LENGTH}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshStandardMaterial attach="material" color={"black"} />
      {new Array(LENGTH).fill(0).map((_: any, i: number) => (
        <Text key={i} />
      ))}
    </Instances>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 40] }}>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={2.5} color={"pink"} position={[0, 0, 50]} />
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
