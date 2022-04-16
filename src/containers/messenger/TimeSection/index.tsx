import React from "react";
import * as S from "./styles";

function TimeSection({ maxTimeBefore, timeInterval, distancePerTime }: any) {
  return (
    <>
      <S.TimeLine length={Math.floor(maxTimeBefore / timeInterval) * (distancePerTime * timeInterval)} />

      <S.TimeSection distance={distancePerTime * timeInterval}>
        {new Array(Math.floor(maxTimeBefore / timeInterval) + 1).fill(0).map((_, i) => (
          <S.TimeContainer key={i} distance={distancePerTime * timeInterval}>
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
