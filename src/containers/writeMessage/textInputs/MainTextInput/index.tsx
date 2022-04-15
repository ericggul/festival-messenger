import React, { useRef, useEffect } from "react";
import * as S from "./styles";

//hooks
import useInput from "@U/hooks/useInput";

const MainTextInput = ({ defaultText, getTextState, onTextRespond, isTextBlack }: any) => {
  const { value: mainText, onChange: onMainTextChange, setValue: setMainText } = useInput(defaultText || "");
  const textAreaEl = useRef<any>(!null);

  const handleHeightAdjust = () => {
    textAreaEl.current.style.height = "inherit";
    textAreaEl.current.style.height = `${textAreaEl.current.scrollHeight}px`;
  };

  useEffect(() => {
    handleHeightAdjust();
  }, []);

  useEffect(() => {
    if (getTextState) {
      onTextRespond(mainText);
    }
  }, [getTextState]);

  return (
    <S.MainText>
      <S.MainTextInput isTextBlack={isTextBlack} value={mainText} ref={textAreaEl} onKeyDown={handleHeightAdjust} onChange={onMainTextChange} placeholder="내용을 입력하세요" />
    </S.MainText>
  );
};
export default MainTextInput;
