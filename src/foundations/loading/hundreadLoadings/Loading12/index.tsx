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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const Text = ({ i }: any) => {
  extend({ TextGeometry });

  const pos = useMemo(() => ({ x: getRandom(-0.5, 0.5), y: getRandom(-0.5, 0.5), z: getRandom(-5, 5) }), []);
  const rotatePos = useMemo(() => ({ y: getRandom(0, Math.PI * 2) }), []);
  const rotateSpeed = useMemo(() => ({ y: getRandom(-0.1, 0.1) }), []);

  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(() => ({ font: font, size: 15, height: 1, curveSegments: 10, bevelEnabled: true, bevelThickness: 10 }), [font]);

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
      mesh.current.position.x = 0;
      mesh.current.position.y = size.y * 0.5 * (-8 + i);
      mesh.current.position.z = 0;
      mesh.current.rotation.y = rotateSpeed.y * t + rotatePos.y;
    }
  });

  return (
    <mesh ref={mesh}>
      <textGeometry attach="geometry" args={["LOADING", config]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

function Loading() {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 90] }}>
        <ambientLight intensity={0.2} />

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
