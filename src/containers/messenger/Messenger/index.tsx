import React, { useState } from "react";
import * as S from "./styles";

function Messenger() {
  //time Interval: Hours
  const [timeInterval, setTimeInterval] = useState(3);
  const [maxTimeBefore, setMaxTimeBefore] = useState(31);

  return (
    <S.Container>
      <S.InnerContainer>
        <S.TimeLine length={Math.ceil(maxTimeBefore / timeInterval) * 128} />
        {new Array(Math.ceil(maxTimeBefore / timeInterval)).fill(0).map((_, i) => (
          <S.TimeContainer key={i}>
            <S.TimeText>{`${(Math.ceil(maxTimeBefore / timeInterval) - i - 1) * timeInterval}시간전`}</S.TimeText>
            <S.TimeBubble />
          </S.TimeContainer>
        ))}
      </S.InnerContainer>
    </S.Container>
  );
}
export default Messenger;
