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
  { uTime: 0, uColor: new THREE.Color(0, 0, 0), uTexture: new THREE.Texture() },
  //vertext shader
  glsl`
  precision mediump float;

  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;

  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  glsl`
  precision mediump float;

  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vWave;

  #define NUM_OCTAVES 5

  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }


  void main(){
    vec2 uv = vUv;

    float strength = smoothstep(0.5, 0.7,1.0- uv.y);

    vec2 surface = strength * vec2(
      mix(-0.3, 0.3, fbm(5.0 * uv + 0.5 * uTime)), 
      mix(-0.3, 0.3, fbm(5.0 * uv + 0.5 * uTime))
    );
    uv += refract(vec2(0.0, 0.0), surface, 1.0/1.333);
    vec3 texture = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(texture, 1.0);
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
export default NotFound;
