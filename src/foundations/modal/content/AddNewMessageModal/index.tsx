import React from "react";
import useAuth from "@U/hooks/useAuth";
import * as S from "./styles";

function AddNewMessageModal({ setIsModalOpen }: any) {
  return (
    <S.Box>
      <S.CloseButton onClick={() => setIsModalOpen(false)} />
      <S.Text>Sign In</S.Text>
    </S.Box>
  );
}

export default AddNewMessageModal;
