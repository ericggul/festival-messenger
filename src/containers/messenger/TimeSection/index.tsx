import React from "react";
import * as S from "./styles";

function TimeSection({ maxTimeBefore, timeInterval, distancePerTime }: any) {
  function timeConverter(time: any) {
    if (time % 24 === 0) {
      if (time === 24) {
        return "하루전";
      } else if (time === 0) {
        return "지금";
      } else {
        return `${time / 24}일전`;
      }
    } else {
      return `${time}시간전`;
    }
  }

  return (
    <>
      <S.TimeLine length={Math.floor(maxTimeBefore / timeInterval) * (distancePerTime * timeInterval)} />

      <S.TimeSection distance={distancePerTime * timeInterval}>
        {new Array(Math.floor(maxTimeBefore / timeInterval) + 1).fill(0).map((_, i) => (
          <S.TimeContainer key={i} distance={distancePerTime * timeInterval}>
            <S.TimeText>{timeConverter(i * timeInterval)}</S.TimeText>
            <S.TimeBubble oClock={(i * timeInterval) % 24 === 0}>
              <S.InnerTimeBubble oClock={(i * timeInterval) % 24 === 0} />
            </S.TimeBubble>
          </S.TimeContainer>
        ))}
      </S.TimeSection>
    </>
  );
}
export default TimeSection;
