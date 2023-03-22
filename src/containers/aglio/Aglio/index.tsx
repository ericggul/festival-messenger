import React, { useEffect, useMemo, useState } from "react";

import Intro from "@C/aglio/Intro";
import Questions from "@C/aglio/Questions";
import Loading from "@C/aglio/Loading";
import { useNavigate } from "react-router-dom";

export default function Aglio() {
  const [state, setState] = useState("intro");
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);

  useEffect(() => {
    if (state === "loading") {
      setTimeout(sendToResult, 3500);
    }
  }, [answerArchive, state]);
  const navigate = useNavigate();

  function sendToResult() {
    console.log(answerArchive);

    const typeCount = (char: any) => answerArchive.filter((el) => el === char).length;
    const typeSelector = ([a, b]: any) => (typeCount(a) > typeCount(b) ? a : b);

    const type = typeSelector(["E", "I"]) + typeSelector(["S", "N"]) + typeSelector(["T", "F"]) + typeSelector(["J", "P"]);

    navigate("/aglio/results/" + type);
  }

  return (
    <>
      {state === "intro" && <Intro handleNext={() => setState("questions")} />}
      {state === "questions" && (
        <Questions
          handleNext={(archive: any) => {
            setAnswerArchive(archive);
            setState("loading");
          }}
        />
      )}
      {state === "loading" && <Loading />}
    </>
  );
}
