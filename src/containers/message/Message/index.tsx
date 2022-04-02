import React, { useMemo } from "react";
import * as S from "./styles";
import MessageBackground from "@F/background/MessageBackground";

function Message({ id }: any) {
  console.log(id);
  return (
    <S.Container>
      <MessageBackground />
    </S.Container>
  );
}
export default Message;
