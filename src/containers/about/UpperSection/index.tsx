import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import useResize from "@U/hooks/useResize";

const Fade = require("react-reveal/Fade");

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function UpperSection() {
  const [windowWidth, windowHeight] = useResize();

  const navigate = useNavigate();

  const headerRef1 = useRef<any>(!null);
  const textRef1 = useRef<any>(!null);
  const headerRef2 = useRef<any>(!null);
  const textRef2 = useRef<any>(!null);
  const headerRef3 = useRef<any>(!null);

  function typeWriter(text: string, i: number, ref: any) {
    if (text && i < text.length) {
      ref.current.textContent += text.charAt(i);
      if (text.charAt(i) == " ") {
        ref.current.textContent += " ";
      }
      setTimeout(() => typeWriter(text, i + 1, ref), getRandom(75, 150));
    }
  }

  useEffect(() => {
    let timeout1: any;
    let timeout2: any;
    let timeout3: any;
    let timeout4: any;
    let timeout5: any;
    if (headerRef1 && textRef1 && headerRef2 && textRef2 && headerRef3) {
      timeout1 = setTimeout(() => typeWriter("어디서든", 0, headerRef1), 500);
      timeout2 = setTimeout(() => typeWriter("보낼 수 있지만", 0, textRef1), 1500);
      timeout3 = setTimeout(() => typeWriter("버들골에서만", 0, headerRef2), 3000);
      timeout4 = setTimeout(() => typeWriter("읽을 수 있는 네 마음", 0, textRef2), 4200);
      timeout5 = setTimeout(() => typeWriter("페스티벌 메신저", 0, headerRef3), 5500);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);
      };
    }
  }, [headerRef1, headerRef2, headerRef3, textRef1, textRef2]);

  return (
    <S.Container>
      <S.UpperPart>
        <S.SingleClause>
          <S.Header ref={headerRef1} />
          <S.Text ref={textRef1} />
        </S.SingleClause>
        <S.SingleClause>
          <S.Header ref={headerRef2} />
          <S.Text ref={textRef2} />
        </S.SingleClause>
        <S.SingleClause>
          <S.Header ref={headerRef3} />
        </S.SingleClause>
      </S.UpperPart>
      <S.Button
        onClick={() =>
          navigate("/map", {
            state: {
              focusAddMessageButton: true,
            },
          })
        }
      >
        지금 메시지 작성하기
      </S.Button>
    </S.Container>
  );
}
