import React, { useEffect, useMemo, useState, useRef } from "react";

import LoadingContainer from "@C/odbd/Loading";
import Intro from "@C/odbd/Intro";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";
import { ELEMENTS_EXPLAIN } from "./Intro";

import preloadImage from "@U/functions/preload";

const ASSET_LINK_EXPLAIN = `/odbd/2_explain_page`;

export default function ODBD() {
  const [state, setState] = useState("intro");

  const navigate = useNavigate();

  const storedIndexesRef = useRef<any>({});
  function handleCardNext(st: any, selectedCardIdx: any) {
    storedIndexesRef.current[st] = selectedCardIdx;
    if (st < 2) {
      setState(`card ${st + 1}`);
    }

    if (st >= 2) {
      console.log(Object.entries(storedIndexesRef.current));
      let code = Object.entries(storedIndexesRef.current)
        .sort((a: any, b: any) => a[0] - b[0])
        .map((el: any) => el[1])
        .map((el: number) => (el < 10 ? "0" + el.toString() : el.toString()))
        .join("-");

      setTimeout(() => navigate("/odbd/results/" + code), 200);
    }
  }

  const [showLoading, setShowLoading] = useState(true);

  //preload
  useEffect(() => {
    ELEMENTS_EXPLAIN.forEach((el) => {
      preloadImage(`${ASSET_LINK_EXPLAIN}/${el.img}.png`);
    });
  }, []);

  const audioRef = useRef<any>();

  return (
    <>
      {(state === "intro" || state === "expl") && <Intro audioRef={audioRef} setShowLoading={setShowLoading} state={state} setState={setState} />}
      {state.includes("card") && <Cards state={parseInt(state.split(" ")[1])} handleNext={handleCardNext} />}
      <LoadingContainer show={showLoading} />

      <audio ref={audioRef} src="/odbd/bgm/start.mp3" loop autoPlay={false} muted={false} playsInline />
    </>
  );
}
