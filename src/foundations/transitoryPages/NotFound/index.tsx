import React, { Suspense, useRef, useState, useCallback, useEffect } from "react";
import * as S from "./styles";

//Three
import * as THREE from "three";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

//confetti
import ReactCanvasConfetti from "react-canvas-confetti";

//react router
import { useNavigate } from "react-router-dom";

//Icons
import Poster from "@I/poster/poster.png";
import glsl from "babel-plugin-glsl/macro";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const WaveShaderMaterial = shaderMaterial(
  //uniforms
  { uTime: 0, uColor: new THREE.Color(0, 0, 0), uTexture: new THREE.Texture() },
  //vertext shader
  glsl`
  precision mediump float;

  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;

  #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

  void main(){
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 1.4;
    float noiseAmp = 0.2;

    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise3(noisePos) * noiseAmp;
    vWave = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,
  glsl`
  precision mediump float;

  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vWave;

  void main(){
    float wave = vWave * 0.15;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;
    gl_FragColor = vec4(texture, 1.0);
  }

  `
);

extend({ WaveShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: any;
    }
  }
}

const Wave = () => {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));
  const [image] = useLoader(THREE.TextureLoader, [Poster]);

  return (
    <mesh>
      <planeBufferGeometry args={[0.596, 0.842, 40, 40]} />
      <waveShaderMaterial uColor={"white"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 12, position: [0, 0, 7] }}>
      <color attach="background" args={["#033774"]} />
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

function NotFound() {
  const canvasStyles = {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  };

  const getAnimationSettings = (originXA: any, originXB: any) => {
    return {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10,
      particleCount: 150,
      origin: {
        x: getRandom(originXA, originXB),
        y: Math.random() - 0.2,
      },
    };
  };
  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>(null);
  const getInstance = (instance: any) => (refAnimationInstance.current = instance);
  const nextTickAnimation = () => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  };

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  useEffect(() => {
    startAnimation();
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const navigate = useNavigate();

  return (
    <>
      <S.SceneContainer>
        <Scene />
      </S.SceneContainer>

      <S.Container onClick={() => navigate("/map")}>
        <S.Text>페이지가 존재하지 않습니다.</S.Text>
        <S.Button>메인으로 가기</S.Button>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </S.Container>
    </>
  );
}
export default NotFound;
