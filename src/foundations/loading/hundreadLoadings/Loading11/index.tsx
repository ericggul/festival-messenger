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

const Text = () => {
  extend({ TextGeometry });

  const relativeViewportPos = useMemo(() => ({ x: getRandom(-0.5, 0.5), y: getRandom(-0.5, 0.5) }), []);
  const font = useLoader(FontLoader, "/assets/fonts/Roboto_Regular.json");

  const config = useMemo(() => ({ font: font, size: 20, height: 1, curveSegments: 12, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelOffset: 0, bevelSegments: 1 }), [font]);

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
      mesh.current.position.x = viewport.width * relativeViewportPos.x - size.x / 2;
      mesh.current.position.y = viewport.height * relativeViewportPos.y - size.y / 2;
      mesh.current.position.z = 50 - t * 10;
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
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 70] }}>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={3} color={"pink"} position={[100, 0, 100]} castShadow shadow-mapSize={[1024, 1024]} />
        <Suspense fallback={null}>
          {new Array(20).fill(0).map((e, i) => (
            <Text key={i} />
          ))}

          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </S.Container>
  );
}
export default Loading;
