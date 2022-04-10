import React, { useMemo } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
import LoginBackground from "@F/background/LoginBackground";
import useAuth from "@U/hooks/useAuth";

function LoginContainer(props: any) {
  const { signIn } = useAuth(props?.navigateTo || "/settings");

  return (
    <S.Container>
      <LoginBackground />
      <S.Button onClick={signIn}>카카오톡으로 로그인</S.Button>
    </S.Container>
  );
}

export default LoginContainer;
