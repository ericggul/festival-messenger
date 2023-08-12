import useResize from "@/utils/hooks/useResize";
import React, { useEffect, useState, useRef, Suspense } from "react";

//react-gl imports
import GLTransition from "./GLTransition";

//glsls
import { glTransitions } from "./glsls";

//usespring
import { useSpring } from "react-spring";

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

const getNearestAbovePowerOfTwo = (num: number) => Math.pow(2, Math.ceil(Math.log(num) / Math.log(2)));

export default function App({ startTransition, fromImgUrl, toImgUrl, duration = 3000 }: any) {
  const [windowWidth, windowHeight] = useResize();

  const [start, setStart] = useState(0);
  const [to, setTo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glTransitionsIdx, setGLTransitionsIdx] = useState(4);
  const storedImgUrl = useRef(toImgUrl);

  useEffect(() => {
    if (startTransition) {
      setGLTransitionsIdx(getRandomInt(8));
      storedImgUrl.current = toImgUrl;
      setStart(0);
      setTo(1);
    } else {
      setStart(0);
      setTo(0);
    }
  }, [startTransition, toImgUrl]);

  useSpring({
    from: { progress: start },
    to: { progress: to },
    config: { duration, tension: 170, friction: 26 },
    reset: storedImgUrl.current != toImgUrl,
    onChange: ({ value }) => {
      setProgress(value.progress);
    },
    onRest: () => {
      storedImgUrl.current = toImgUrl;
    },
  });

  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <GLTransition
          from={fromImgUrl}
          to={toImgUrl}
          transition={glTransitions[glTransitionsIdx]}
          progress={progress}
          windowWidth={getNearestAbovePowerOfTwo(windowWidth)}
          windowHeight={getNearestAbovePowerOfTwo(windowHeight)}
        />
      </Suspense>
    </React.Fragment>
  );
}
