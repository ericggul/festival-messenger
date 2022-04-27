import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import * as THREE from "three";

import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Sky, Stars, Cloud } from "@react-three/drei";
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
      mesh.current.position.x = Math.sin(t) * 10 + (state.mouse.x * viewport.width) / 2 - size.x / 2;
      mesh.current.position.y = viewport.height * 2 * Math.exp(-3 * t) * Math.cos(t * 3) + (state.mouse.y * viewport.height) / 2 - size.y / 2;
      mesh.current.position.z = Math.cos(t / 1.3) * 4;
      mesh.current.rotation.y = Math.sin(t) * 0.05;
      mesh.current.rotation.z = Math.sin(t / 1.17) * 0.05;
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
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 100] }}>
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        {/* <Cloud
          opacity={0.5}
          speed={0.4} // Rotation speed
          width={10} // Width of the full cloud
          depth={1.5} // Z-dir depth
          segments={20} // Number of particles
        /> */}
        <ambientLight intensity={0.2} />
        <directionalLight intensity={3} color={"pink"} position={[100, 0, 100]} castShadow shadow-mapSize={[1024, 1024]} />
        <Suspense fallback={null}>
          <Text />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </S.Container>
  );
}
export default Loading;
