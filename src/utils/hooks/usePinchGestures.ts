import { useEffect, useState, useCallback } from "react";

export default function usePinchGestures() {
  const [scale, setScale] = useState(1);
  function startGesture(gesture: any) {
    console.log("start", gesture);
  }

  function doGesture(gesture: any) {
    console.log("do", gesture);
    setScale(gesture.scale);
  }

  function endGesture(gesture: any) {}

  const WHEEL_SCALE_SPEEDUP = 2;
  const WHEEL_TRANSLATION_SPEEDUP = 2;
  const [gesture, setGesture] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);
  function normalizeWheel(ev: any) {
    let dx = ev.deltaX;
    let dy = ev.deltaY;

    if (dx === 0 && ev.shiftKey) {
      [dx, dy] = [dy, dx];
    }

    if (ev.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      dx *= 8;
      dy *= 8;
    } else if (ev.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      dx *= 24;
      dy *= 24;
    }

    dy = Math.sign(dy) * Math.min(24, Math.abs(dy));

    return [dx, dy];
  }
  // function handleWheel(ev: any) {
  //   ev.preventDefault();

  //   let [dx, dy] = normalizeWheel(ev);

  //   let tempGesture;
  //   if (!gesture) {
  //     tempGesture = {
  //       scale: 1,
  //     };
  //     setGesture(tempGesture);
  //     startGesture(tempGesture);
  //   } else {
  //     tempGesture = gesture;
  //   }

  //   if (ev.ctrlKey && tempGesture) {
  //     //pinch-zoom
  //     let factor = dy <= 0 ? 1 - WHEEL_SCALE_SPEEDUP * dy : 1 / (1 + (WHEEL_SCALE_SPEEDUP * dy) / 100);
  //     tempGesture = {
  //       scale: tempGesture.scale * factor,
  //     };
  //   }
  //   setGesture(tempGesture);
  //   doGesture(tempGesture);

  //   if (timer) {
  //     window.clearTimeout(timer);
  //   }
  //   let tempTimer = window.setTimeout(() => {
  //     if (gesture) {
  //       endGesture(gesture);
  //       setGesture(null);
  //     }
  //   }, 50);
  //   setTimer(tempTimer);
  // }

  //distance handle utils
  function midpoint(touches: any) {
    let [t1, t2] = touches;
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    };
  }
  function distance(touches: any) {
    let [t1, t2] = touches;
    return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  }
  function angle(touches: any) {
    let [t1, t2] = touches;
    return (Math.atan2(t1.clientY - t2.clientY, t1.clientX - t2.clientX) * 180) / Math.PI;
  }

  const handleTouchMove = (ev: any, initTouches: any) => {
    let tempGesture;

    if (ev.touches.length === 2 && initTouches) {
      let mpInit = midpoint(initTouches);
      let mpCurr = midpoint(ev.touches);

      tempGesture = {
        scale: distance(ev.touches) / distance(initTouches),
      };
      doGesture(tempGesture);
      setGesture(tempGesture);
      ev.preventDefault();
    }
    if (ev.cancelable !== false) {
      ev.preventDefault();
    }
  };

  function handleTouches(ev: any) {
    let initialTouches: any;
    let tempGesture;
    if (ev.touches.length === 2) {
      initialTouches = ev.touches;

      tempGesture = {
        scale: 1,
      };
      if (ev.type === "touchstart") {
        ev.preventDefault();
      }

      startGesture(tempGesture);

      setGesture(tempGesture);

      document.addEventListener("touchmove", (ev) => handleTouchMove(ev, initialTouches));
      document.addEventListener("touchend", handleTouches);
      document.addEventListener("touchcancel", handleTouches);
    } else if (gesture) {
      endGesture(gesture);
      setGesture(null);
      document.removeEventListener("touchmove", (ev) => handleTouchMove(ev, initialTouches));
      document.removeEventListener("touchend", handleTouches);
      document.removeEventListener("touchcancel", handleTouches);
    }
  }

  useEffect(() => {
    //wheel eventlistener
    // document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouches);

    return () => {
      // document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouches);
    };
  }, []);

  return scale;
}
