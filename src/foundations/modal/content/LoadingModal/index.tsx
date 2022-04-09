import React from "react";
import * as S from "./styles";

function LoadingModal() {
  return (
    <>
      <S.Container />
      <S.Box>
        <p>전송중...</p>
        <p>이미지, 오디오 파일이 있을 경우 최대 5분 소요될 수 있습니다.</p>
      </S.Box>
    </>
  );
}
export default LoadingModal;
