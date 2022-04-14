import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

const TimeSection = ({ maxTimeBefore, timeInterval }: any) => {
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
};

function Messenger() {
  //time Interval: Hours
  const [timeInterval, setTimeInterval] = useState(3);
  const [maxTimeBefore, setMaxTimeBefore] = useState(31);

  const innerContainerRef = useRef<any>(null);

  return (
    <S.Container>
      <S.InnerContainer ref={innerContainerRef}>
        <TimeSection maxTimeBefore={maxTimeBefore} timeInterval={timeInterval} />
      </S.InnerContainer>
    </S.Container>
  );
}
export default Messenger;
