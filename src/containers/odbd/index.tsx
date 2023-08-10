import React, { useEffect, useMemo, useState, useRef } from "react";

import Intro from "@C/odbd/Intro";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";

export default function ODBD() {
  const [state, setState] = useState("intro");
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);

  const navigate = useNavigate();

  function handleToResult() {}

  const storedIndexesRef = useRef<any>([]);
  function handleCardNext(st: any, selectedCardIdx: any) {
    storedIndexesRef.current.push(selectedCardIdx);
    if (st <= 1) setState(`card ${st + 1}`);
    else {
      handleToResult();
    }
  }

  return (
    <>
      {(state === "intro" || state === "expl") && <Intro state={state} setState={setState} />}
      {state.includes("card") && <Cards state={parseInt(state.split(" ")[1])} handleNext={handleCardNext} />}
    </>
  );
}
