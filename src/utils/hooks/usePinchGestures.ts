import { useEffect, useState } from "react";

export default function usePinchGestures() {
  const [evCache, setEvCache] = useState<any>([]);
  const [distance, setDistance] = useState(-1);

  function handlePointerDown(ev: any) {
    ev.preventDefault();
    evCache.push(ev);
  }

  function handlePointerMove(ev: any) {
    ev.preventDefault();
    //updating event cache
    for (let i = 0; i < evCache.length; i++) {
      if (ev.pointerId === evCache[i].pointerId) {
        evCache[i] = ev;
        break;
      }
    }

    if (evCache.length === 2) {
      const distanceX = Math.abs(evCache[0].clientX - evCache[1].clientY);
      const distance2D = Math.sqrt((evCache[0].clientX - evCache[1].clientX) ** 2 + (evCache[0].clientY - evCache[1].clientY) ** 2);

      setDistance(distanceX);
    }
  }

  console.log(evCache);
  console.log(distance);

  function handlePointerUp(ev: any) {
    console.log("pointer up!");
    ev.preventDefault();
    for (let i = 0; i < evCache.length; i++) {
      if (ev.pointerId === evCache[i].poinerId) {
        console.log(i);
        delete evCache[i];
        break;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("touchmove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("poinetercancel", handlePointerUp);
    document.addEventListener("pointerout", handlePointerUp);
    document.addEventListener("pointerleave", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("poinetercancel", handlePointerUp);
      document.removeEventListener("pointerout", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerUp);
    };
  }, []);

  return distance;
}
