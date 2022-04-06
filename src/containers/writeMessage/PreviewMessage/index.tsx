import React from "react";
import * as S from "./styles";

//redux
import { useAppSelector } from "@R/common/hooks";

function PreviewMessage() {
  const preview = useAppSelector((state) => state.singleMessagePreview);
  console.log(preview);
  return <S.Container>PreviewMessage</S.Container>;
}
export default PreviewMessage;
