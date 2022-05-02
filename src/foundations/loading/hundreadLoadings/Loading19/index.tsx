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
  const xPos = getRandom(-viewport.width / 2, viewport.width / 2);
  const yPos = getRandom(-100, 10);
  const deltaTime = getRandom(-5, 5);
  const deltaX = getRandom(-viewport.width / 4, viewport.width / 4);
  const deltaY = getRandom(-50, 50);
  const deltaZ = getRandom(-20, getRandom(0, 30));

  const rotationX = getRandom(-Math.PI / 2, Math.PI / 2);
  const rotationSpeed = { x: getRandom(-1, 1), y: getRandom(-1, 1), z: getRandom(-1, 1) };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    ref.current.position.set(-2, 10 - idx, 0);
    ref.current.rotation.set(t * 3, 0, 0);
  });

  return <Instance ref={ref} />;
};

const Texts = () => {
  extend({ TextGeometry });
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 1,
      height: 0.1,

      // bevelEnabled: true,
    }),
    [font]
  );

  return (
    <Instances limit={LENGTH}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshNormalMaterial attach="material" />
      {new Array(LENGTH).fill(0).map((_: any, i: number) => (
        <Text key={i} idx={i} />
      ))}
    </Instances>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [5, 10, 10] }}>
        <ambientLight intensity={0.8} />
        <fog attach="fog" args={["red", 4, 30]} />
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
