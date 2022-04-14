import React, { useEffect, useState } from "react";
import * as S from "./styles";

function Loading() {
  function timeConverter(int: number) {
    if (int < 10) {
      return `0${int}`;
    }
    return int.toString();
  }
  let today = new Date();
  const [h, setH] = useState(timeConverter(today.getHours()));
  const [m, setM] = useState(timeConverter(today.getMinutes()));
  const [s, setS] = useState(timeConverter(today.getSeconds()));

  useEffect(() => {
    let interval = setInterval(() => {
      today = new Date();
      setH(timeConverter(today.getHours()));
      setM(timeConverter(today.getMinutes()));
      setS(timeConverter(today.getSeconds()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <S.Container>
      <p>Life is Long</p>
      <h1>{`${h}:${m}:${s}`}</h1>
      <p>Loading is Short</p>
    </S.Container>
  );
}
export default Loading;
