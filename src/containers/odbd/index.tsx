import React, { useEffect, useMemo, useState } from "react";

import Intro from "@C/odbd/Intro";
import Expl from "@C/odbd/Expl";
import Cards from "@C/odbd/Cards";

import { useNavigate } from "react-router-dom";

export default function ODBD() {
  const [state, setState] = useState("intro");
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);

  const navigate = useNavigate();

  function handleToResult() {}

  return (
    <>
      {state === "intro" && <Intro handleNext={() => setState("expl")} />}
      {state === "expl" && <Expl handleNext={() => setState("card 1")} />}
      {state.includes("card") && <Cards state={parseInt(state.split(" ")[1])} handleNext={(st: any) => (st <= 2 ? () => setState(`card ${st + 1}`) : handleToResult)} />}
    </>
  );
}
