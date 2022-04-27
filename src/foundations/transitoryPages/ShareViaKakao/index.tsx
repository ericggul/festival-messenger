import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useDisminishingInterval from "@U/hooks/useDisminishingInterval";

import Cross from "@I/icons/kakao/cross.svg";
import Kakao from "@I/icons/kakao/kakao.svg";

import { useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const ShareViaKakao = ({ onClick }: any) => {
  const [number, setNumber] = useState(52);
  const [show, setShow] = useState(false);

  useDisminishingInterval(() => setNumber((n) => n + 1), 10, 0.2, 47);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumber((n) => n + 1);
      setShow(true);
    }, 5200);
    return () => clearTimeout(timeout);
  }, []);

  const navigate = useNavigate();

  return (
    <S.Container show={show} onClick={onClick}>
      <S.Back
        onClick={(ev) => {
          ev.preventDefault();
          navigate("/messenger");
        }}
      >
        <S.Icon src={Cross} />
        <S.Text>Exit</S.Text>
      </S.Back>
      <S.ImgContainer>
        <S.Img src={Kakao} show={show} />
        <S.Number show={show}>{number}</S.Number>
      </S.ImgContainer>

      <S.SubContainer>
        <p>많은 메시지는 그저 숫자에 불과하지만</p>
        <p>어떤 메시지는 숫자 그 이상의 가치를 가집니다.</p>
        <p>아이콘을 클릭해서 친구에게</p>
        <p>소중한 메시지를 전달하세요.</p>
      </S.SubContainer>
    </S.Container>
  );
};

export default ShareViaKakao;
