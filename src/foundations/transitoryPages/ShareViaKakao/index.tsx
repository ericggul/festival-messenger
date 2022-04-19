import React, { useMemo } from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const KakaoIcon = () => {
  const brownColor = useMemo(() => `hsl(29, 100%, ${getRandom(25, 35)}%)`, []);
  const scale = useMemo(() => 2, []);
  //originally -149
  const rotate = useMemo(() => getRandom(0, 360), []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} transform={`rotate(${rotate}) scale(${scale})`}>
      <g id="그룹_6" data-name="그룹 6" transform="translate(-167 -652)">
        <circle id="타원_1" data-name="타원 1" cx="17" cy="17" r="17" transform="translate(167 652)" style={{ fill: "hsl(56, 100%, 48%)" }} />
        <ellipse id="타원_2" data-name="타원 2" style={{ fill: brownColor }} cx="10.077" cy="8.061" rx="10.077" ry="8.061" transform="translate(173.852 659.622)" />
        <path id="다각형_1" data-name="다각형 1" style={{ fill: brownColor }} d="m4.6 0 4.6 12.026H0z" transform={`rotate(-149 185.425 315.762)`} />
      </g>
    </svg>
  );
};

function ShareViaKakao() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(150).fill(0).map((e, i) => (
        <KakaoIcon key={i} />
      ))}
    </S.Container>
  );
}
export default ShareViaKakao;
