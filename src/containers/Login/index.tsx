import React, { useMemo } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
import LoginBackground from "@F/background/LoginBackground";
import useAuth from "@U/hooks/useAuth";
import { Helmet } from "react-helmet";
function LoginContainer(props: any) {
  const { signIn } = useAuth(props?.navigateTo || "/settings");

  return (
    <>
      <Helmet>
        <title>페스티벌 메신저</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="버들골에서만 읽을 수 있는 네 마음" />
        <meta property="og:image" content="https://festival-messenger.com/logo512.png" />
      </Helmet>
      <S.Container onClick={signIn}>
        <LoginBackground />
        {/* <S.Description>
          <h1>어디서든 보낼 수 있지만,</h1>
          <h1>버들골에서만 읽을 수 있는 네 마음</h1>
        </S.Description> */}
        <S.Button>카카오톡으로 로그인</S.Button>
        {/* <S.Description>
          <h3>2022 서울대학교 봄축제</h3>
          <h3>SNU Festival: 홈커밍 메신저</h3>
        </S.Description> */}
      </S.Container>
    </>
  );
}

export default LoginContainer;
