import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as S from "./styles";

//navigator
import { useNavigate } from "react-router-dom";

//hooks
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Functions
import getDistance from "@U/functions/distance";

//middleware
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";

//Images
import { NO_PROFILE } from "@U/hooks/useAuth";
import ClockIcon from "@I/icons/openMessage/clock.svg";

function OpenMessageModalContents({ message, pos, chatId, messageId }: any) {
  //Message Availablity based on distance btw message and currentPos

  const user = useAppSelector((state) => state.users);
  const [messageAvailable, setMessageAvailable] = useState(false);
  useEffect(() => {
    const distance = getDistance(message.latLngPos, pos);
    setMessageAvailable(distance < 50 ? true : true);
  }, [message.latLngPos, pos]);

  //get delta time of message
  const time = useMemo(() => {
    const hours = Math.ceil((Date.now() / 1000 - message.createdAt.seconds) / (60 * 60));
    return hours >= 24 ? `${Math.floor(hours / 24)}일전` : `${hours}시간전`;
  }, [message.createdAt]);

  //get user from information
  const [fromName, setFromName] = useState("");
  const [fromProfile, setFromProfile] = useState("");
  const dispatch = useAppDispatch();
  async function getNameFromId() {
    try {
      const from = await dispatch(fetchUserInformationWithoutUpdatingRedux(message.messageFrom));
      setFromName(from.payload.name);
      setFromProfile(from.payload.profileImage || NO_PROFILE);
    } catch (e) {
      alert("No matching user record!");
    }
  }
  useEffect(() => {
    getNameFromId();
  }, [message.messageFrom]);

  //Navigate on click
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (messageAvailable) {
      navigate(`/message/${chatId}/${messageId}`);
    }
  }, [messageAvailable, chatId, messageId]);

  return (
    <>
      <S.Background color={message.color} />
      <S.Container>
        <S.Header>
          <S.HeaderText>메시지 열어보기</S.HeaderText>
          <S.Time>
            {message.messageFrom === user.uid && <S.TimeIcon src={ClockIcon} />}
            <S.TimeText>{message.messageFrom === user.uid ? (message.read ? "상대가 읽음" : "상대가 읽지않음") : time}</S.TimeText>
          </S.Time>
        </S.Header>
        <S.Profile src={fromProfile} />
        <S.ContentsPreview>
          <S.FromText>{message.messageFrom === user.uid ? `To. ${message.toName}` : `From. ${fromName}`}</S.FromText>
          <S.BodyText>{message.mainText.replaceAll("\\n", "\n").slice(0, Math.min(Math.floor(message.mainText.length * 0.3), 30))}...</S.BodyText>
        </S.ContentsPreview>

        <S.ButtonContainer>
          <S.Button shine={messageAvailable} onClick={handleClick}>
            열기
          </S.Button>
          {!messageAvailable && (
            <S.NotAccessible>
              <p>메시지는 버들골 내 핀 근처에서만 열람할 수 있습니다.</p>
              <p>핀이 찍힌 위치 가까이로 가주세요.</p>
            </S.NotAccessible>
          )}
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
export default OpenMessageModalContents;
