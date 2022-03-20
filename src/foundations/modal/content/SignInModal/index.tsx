import React from "react";
import useAuth from "@U/hooks/useAuth";
import * as S from "./styles";

function SignInModal({ setIsModalOpen }: any) {
  const { signIn } = useAuth();

  return (
    <S.SignInBox>
      <S.CloseButton onClick={() => setIsModalOpen(false)} />
      <S.Text onClick={signIn}>Sign In</S.Text>
    </S.SignInBox>
  );
}

export default SignInModal;
