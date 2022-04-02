import React, { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "@U/functions/timer";

export default function useResize() {
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [windowHeight, setWindowHeight] = useState(document.documentElement.clientWidth > 768 ? document.documentElement.clientHeight : window.innerHeight);

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    setWindowHeight(documentClientWidth > 768 ? documentClientHeight : window.innerHeight);
    setWindowWidth(documentClientWidth);
  }, []);

  const handleResize = useMemo(() => debounce(onResize, 300), [onResize]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [windowWidth, windowHeight];
}
