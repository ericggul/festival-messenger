import React, { useEffect, useMemo, useState, useRef } from "react";

import Intro from "@C/odbd/Intro";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";

export default function ODBD() {
  const [state, setState] = useState("expl");

  const navigate = useNavigate();

  const storedIndexesRef = useRef<any>([]);
  function handleCardNext(st: any, selectedCardIdx: any) {
    storedIndexesRef.current.push(selectedCardIdx);
    setState(`card ${st + 1}`);
    if (st >= 2) {
      let code = storedIndexesRef.current.map((el: number) => (el < 10 ? "0" + el.toString() : el.toString())).join("-");

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
