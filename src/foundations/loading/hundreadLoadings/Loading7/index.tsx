import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Sky, CameraShake, Cloud, Environment } from "@react-three/drei";

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

const Text = ({ i }: any) => {
  extend({ TextGeometry });

  const pos = useMemo(() => ({ x: getRandom(-5, 5), y: getRandom(-15, 15), z: getRandom(-5, 5) }), []);

  const delay = useMemo(() => getRandom(0, Math.PI * 2), []);
  const color = useMemo(() => `rgb(${getFloorRandom(0, 250)}, ${getFloorRandom(0, 250)}, ${getFloorRandom(0, 250)})`, []);
  const rotatePos = useMemo(() => ({ y: getRandom(0, Math.PI * 2) }), []);
  const rotateSpeed = useMemo(() => ({ y: getRandom(-5, 5) }), []);

  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(
    () => ({
      font: font,
      size: 5,
      height: 1,
      curveSegments: 10,
    }),
    [font]
  );

  const mesh = useRef<any>(null);
  const { viewport } = useThree();

  const [size, setSize] = useState(new THREE.Vector3());
  useLayoutEffect(() => {
    const temp = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(temp);
    setSize(temp);
  }, []);
  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime;
      mesh.current.position.x = Math.sin(t + delay) * 2 + pos.x - size.x / 2;
      mesh.current.position.y = pos.y - size.y / 2;
      mesh.current.position.z = pos.z;
      mesh.current.rotation.y = 0;
    }
  });

  return (
    <mesh ref={mesh}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={2.5} color={"pink"} position={[0, 0, 20]} />
        <Suspense fallback={null}>
          {new Array(15).fill(0).map((e, i) => (
            <Text key={i} i={i} />
          ))}

          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </S.Container>
  );
}
export default Loading;
