import React, { Suspense, useRef, useMemo, useState, useCallback, useEffect } from "react";
import ShadertoyReact from "shadertoy-react";

export default function GLTransition({ transition, progress, from, to, size }: any) {
  const [loaded, setLoaded] = useState(false);

  const fragmentShader = useMemo(() => {
    return `
    precision highp float;
    vec4 getFromColor(vec2 uv){return texture2D(iChannel0, uv);}
    vec4 getToColor(vec2 uv){return texture2D(iChannel1, uv);}
    ${transition.glsl}
    void main(){
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      gl_FragColor=transition(uv);
    }
  `;
  }, [transition]);

  useEffect(() => {
    setLoaded(false);
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, [to]);

  return (
    <>
      {loaded && (
        <ShadertoyReact
          fs={fragmentShader}
          uniforms={{
            progress: { type: "1f", value: progress },
            resolution: { type: "2fv", value: [size, size] },
          }}
          textures={[{ url: from }, { url: to }]}
        />
      )}
    </>
  );
}
