import React, { useEffect, useMemo, useState } from "react";

import Intro from "@C/odbd/Intro";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";

export default function ODBD() {
  const [state, setState] = useState("card 1");
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);

  const navigate = useNavigate();

  function handleToResult() {}

  return (
    <>
      {(state === "intro" || state === "expl") && <Intro state={state} handleNext={() => setState("expl")} />}
      {state.includes("card") && <Cards state={parseInt(state.split(" ")[1])} handleNext={(st: any) => (st <= 2 ? () => setState(`card ${st + 1}`) : handleToResult)} />}
    </>
  );
}
