import React, { useEffect, useMemo, useState } from "react";

import Intro from "@C/aglio/Intro";
import Questions from "@C/aglio/Questions";
import Loading from "@C/aglio/Loading";
import { useNavigate } from "react-router-dom";

export default function Aglio() {
  const [state, setState] = useState("intro");
  const [answerArchive, setAnswerArchive] = useState<any[]>([]);

  const navigate = useNavigate();

  return <>{state === "intro" && <Intro handleNext={() => setState("expl")} />}</>;
}
