import React, { useEffect } from "react";
import * as S from "./styles";

//hooks
import useInput from "@U/hooks/useInput";

const ToTextInput = ({ defaultName, getTextState, onTextRespond, isTextBlack }: any) => {
  //Message To Text
  const { value: senderName, onChange: onSenderNameChange, setValue: setSenderName } = useInput(defaultName || "");
  useEffect(() => {
    if (getTextState) {
      onTextRespond(senderName);
    }
  }, [getTextState]);

  return (
    <S.ToText isTextBlack={isTextBlack}>
      Message To. <S.ToTextInput isTextBlack={isTextBlack} value={senderName} onChange={onSenderNameChange} placeholder="이름을 입력하세요" />
    </S.ToText>
  );
};

export default ToTextInput;
