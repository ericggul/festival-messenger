import React, { Suspense, useRef, useState, useCallback, useEffect } from "react";
import * as S from "./styles";

//Three
import * as THREE from "three";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

//Icons
import Poster from "@I/poster/poster.png";
import glsl from "babel-plugin-glsl/macro";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const RippleShaderMaterial = shaderMaterial(
  //uniforms
  { uTime: 0, uTexture: new THREE.Texture(), uAlpha: 1 },
  //vertext shader
  glsl`
  precision mediump float;

  varying vec2 vUv;
  varying vec2 vOffset;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uAlpha;


  #define M_PI 3.1415926535897932384626433832795
  #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

   vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
     position.x = position.x + sin(uv.y * M_PI) * offset.x;
     position.y = position.y + sin(uv.x * M_PI) * offset.y;
     return position;
   }

  void main(){
    vUv = uv;
    vOffset = vec2(0.0, 0.0);
    vOffset.x += sin(uTime * 1.83) * 0.05 - cos(uTime * 3.4) * 0.02;
    vOffset.y += cos(uTime * 1.71) * 0.02 + sin(uTime * 2.3) * 0.01;
    vec3 newPosition = deformationCurve(position, uv, vOffset);

    vec3 noisePos = vec3(position.x * 1.0 + uTime, position.y, position.z);
    newPosition.z += snoise3(noisePos) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`,
  glsl`
  precision mediump float;

  varying vec2 vUv;
  varying vec2 vOffset;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uAlpha;


   vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset){
     float r = texture2D(textureImage, uv + offset).r;
     vec2 gb = texture2D(textureImage, uv).gb;
     return vec3(r, gb);
   }

   void main(){
    vec3 color = rgbShift(uTexture, vUv, vOffset);
    gl_FragColor = vec4(color, uAlpha);
  }
  `
);

extend({ RippleShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      rippleShaderMaterial: any;
    }
  }
}

const Wave = () => {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));
  const [image] = useLoader(THREE.TextureLoader, [Poster]);

  return (
    <mesh>
      <planeGeometry args={[0.596, 0.842, 40, 40]} />
      <rippleShaderMaterial uColor={"white"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 12, position: [0, 0, 7] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

function Loading() {
  return (
    <>
      <S.SceneContainer>
        <Scene />
      </S.SceneContainer>

      <S.Container>
        <S.Text>Loading...</S.Text>
      </S.Container>
    </>
  );
}
export default Loading;
