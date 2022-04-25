import { useRef, useEffect, useState } from "react";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const useDisminishingInterval = (callback: any, initDelay: any, acc: any, attempts: any) => {
  const timeoutId = useRef<any>(null);
  const savedCallback = useRef(callback);
  const delay = useRef(initDelay);
  const delayAcc = useRef(acc);
  const leftAttempts = useRef(attempts);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleTick = () => {
      if (leftAttempts.current > 0) {
        timeoutId.current = setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, delay.current);
      }

      delayAcc.current += acc;
      delay.current += delayAcc.current;
      leftAttempts.current -= 1;
    };

    handleTick();

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [initDelay, acc, attempts]);

  const cancel = () => {
    window.clearTimeout(timeoutId.current);
  };

  return cancel;
};

export default useDisminishingInterval;
