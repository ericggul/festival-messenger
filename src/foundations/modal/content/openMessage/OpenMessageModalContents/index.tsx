import React, { useEffect, useState } from "react";
import * as S from "./styles";

//Functions
import getDistance from "@U/functions/distance";

//hooks
import useResize from "@U/hooks/useResize";

//Images
import ClockIcon from "@I/icons/openMessage/clock.svg";

function OpenMessageModalContents({ message, pos }: any) {
  console.log(message);

  //Modal Width and height
  const [windowWidth, windowHeight] = useResize();

  //Message Availablity based on distance btw message and currentPos
  const [messageAvailable, setMessageAvailable] = useState(false);
  useEffect(() => {
    const distance = getDistance(message.latLngPos, pos);
    setMessageAvailable(distance < 50 ? true : false);
  }, [message.latLngPos, pos]);

  return (
    <S.Container>
      <S.Background color={message.color} />
      <S.Header>
        <S.HeaderText>메시지 열어보기</S.HeaderText>
        <S.Time>
          <S.TimeIcon src={ClockIcon} />
          <S.TimeText>3시간전</S.TimeText>
        </S.Time>
      </S.Header>
      <S.Profile src={"https://laboratory-occupied.com/assets/images/1ArtNoveau/1.png"} />
      <S.ContentsPreview>
        <S.FromText>From. 홍길동</S.FromText>
        <S.BodyText>이 편지를 쓰느라 얼마나 고민했는지...</S.BodyText>
      </S.ContentsPreview>

      <S.ButtonContainer>
        <S.Button>열기</S.Button>
        {!messageAvailable && <S.NotAccessible>핀이 찍힌 위치 가까이로 가주세요.</S.NotAccessible>}
      </S.ButtonContainer>
    </S.Container>
  );
}
export default OpenMessageModalContents;
