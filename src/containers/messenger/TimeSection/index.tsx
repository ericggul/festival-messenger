import React from "react";
import * as S from "./styles";

function TimeSection({ maxTimeBefore, timeInterval }: any) {
  return (
    <>
      <S.TimeLine length={Math.floor(maxTimeBefore / timeInterval) * 128} />

      <S.TimeSection>
        {new Array(Math.ceil(maxTimeBefore / timeInterval)).fill(0).map((_, i) => (
          <S.TimeContainer key={i}>
            <S.TimeText>{`${i * timeInterval}시간전`}</S.TimeText>
            <S.TimeBubble>
              <S.InnerTimeBubble />
            </S.TimeBubble>
          </S.TimeContainer>
        ))}
      </S.TimeSection>
    </>
  );
}
export default TimeSection;
