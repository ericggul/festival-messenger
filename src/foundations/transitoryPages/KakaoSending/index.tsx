import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useDisminishingInterval from "@U/hooks/useDisminishingInterval";

import Cross from "@I/icons/kakao/cross.svg";
import Kakao from "@I/icons/kakao/kakao.svg";

import { useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const KakaoSending = ({ onClick }: any) => {
  const [show, setShow] = useState(false);
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
      </S.ImgContainer>

      <S.SubContainer>
        <p>친구에게 카카오톡 알림 전송중...</p>
      </S.SubContainer>
    </S.Container>
  );
};

export default KakaoSending;
