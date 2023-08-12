import React, { useEffect, useMemo, useState, useRef } from "react";

import Intro from "@C/odbd/Intro";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";

export default function ODBD() {
  const [state, setState] = useState("expl");

  const navigate = useNavigate();

  const storedIndexesRef = useRef<any>({});
  function handleCardNext(st: any, selectedCardIdx: any) {
    storedIndexesRef.current[st] = selectedCardIdx;
    setState(`card ${st + 1}`);
    if (st >= 2) {
      console.log(Object.entries(storedIndexesRef.current));
      let code = Object.entries(storedIndexesRef.current)
        .sort((a: any, b: any) => a[0] - b[0])
        .map((el: any) => el[1])
        .map((el: number) => (el < 10 ? "0" + el.toString() : el.toString()))
        .join("-");

      setTimeout(() => navigate("/odbd/results/" + code), 700);
    }
  }

  return (
    <>
      {(state === "intro" || state === "expl") && <Intro state={state} setState={setState} />}
      {state.includes("card") && <Cards state={parseInt(state.split(" ")[1])} handleNext={handleCardNext} />}
    </>
  );
}
