import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Stars } from "@react-three/drei";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const Cube = () => {
  const ref = useRef<any>(!null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref && ref.current) {
      ref.current.position.z = t * 7;
      ref.current.rotation.z = t;
      ref.current.rotation.x = t * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry attach="geometry" args={[5, 1.5, 8, 64, 2, 3]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 50] }}>
        <color attach="background" args={["black"]} />
        <Stars count={2000} factor={3} />
        <ambientLight intensity={0.2} />
        <directionalLight intensity={3} color={"pink"} position={[40, 0, 20]} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight intensity={2} color="blue" position={[-30, -10, 10]} castShadow />
        <Suspense fallback={null}>
          <Cube />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <S.Text>Loading</S.Text>
    </S.Container>
  );
}
export default Loading;