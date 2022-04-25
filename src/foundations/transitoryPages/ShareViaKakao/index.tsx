import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useDisminishingInterval from "@U/hooks/useDisminishingInterval";
import Kakao from "@I/icons/kakao/kakao.svg";

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

  return (
    <S.Container show={show} onClick={onClick}>
      <S.ImgContainer>
        <S.Img src={Kakao} show={show} />
        <S.Number show={show}>{number}</S.Number>
      </S.ImgContainer>

      <S.SubContainer>
        <p>모든 메시지는 동일한 가치를 가지지 않습니다.</p>
        <p>아이콘을 클릭해서 친구에게 카카오톡 알림을 보내세요!</p>
      </S.SubContainer>
    </S.Container>
  );
};

export default ShareViaKakao;
