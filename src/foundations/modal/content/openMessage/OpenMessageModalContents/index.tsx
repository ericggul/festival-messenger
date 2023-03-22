import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as S from "./styles";

//navigator
import { useNavigate } from "react-router-dom";

//hooks
import useDistanceAvailability from "@U/hooks/messages/useDistanceAvailability";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//middleware
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";

//Images
import { NO_PROFILE } from "@U/hooks/useAuth";
import ClockWhite from "@I/icons/openMessage/clock-white.svg";
import ClockBlack from "@I/icons/openMessage/clock-black.svg";
import CheckWhite from "@I/icons/openMessage/check-white.svg";
import CheckBlack from "@I/icons/openMessage/check-black.svg";

function OpenMessageModalContents({ message, pos, chatId, messageId }: any) {
  //Message Availablity based on distance btw message and currentPos

  const user = useAppSelector((state) => state.users);
  const { messageAvaialble: distanceMessageAvailable, messageDistance } = useDistanceAvailability(pos, user, message);

  //get delta time of message
  const time = useMemo(() => {
    const hours = Math.ceil((Date.now() / 1000 - message.createdAt.seconds) / (60 * 60));
    return `${hours}시간전`;
  }, [message.createdAt]);

  //get user from information
  const [fromName, setFromName] = useState("");
  const [fromProfile, setFromProfile] = useState("");
  const dispatch = useAppDispatch();

  async function getNameFromId() {
    try {
      const from = await dispatch(fetchUserInformationWithoutUpdatingRedux(message.messageFrom));
      setFromName(from.payload.name);
      setFromProfile(message.messageFromProfile || from.payload.profileImage || NO_PROFILE);
    } catch (e) {
      setFromName("No Name");
      setFromProfile(NO_PROFILE);
      alert("No matching user record!");
    }
  }
  useEffect(() => {
    getNameFromId();
  }, [message.messageFrom]);

  //Navigate on click
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (distanceMessageAvailable) {
      navigate(`/message/${chatId}/${messageId}`);
    }
  }, [distanceMessageAvailable, chatId, messageId]);

  return (
    <>
      <S.Background color={message.color} />
      <S.Container color={message.color}>
        <S.Header>
          <S.HeaderText>{message.messageFrom === user.uid ? `To. ${message.toName}` : `From. ${fromName}`}</S.HeaderText>
          <S.Time>
            {message.read ? <S.TimeIcon src={message.color.black ? CheckBlack : CheckWhite} /> : <S.TimeIcon src={message.color.black ? ClockBlack : ClockWhite} />}
            <S.TimeText>{message.messageFrom === user.uid ? (message.read ? "상대가 읽음" : "상대가 읽지않음") : message.read ? "읽은 메시지" : time}</S.TimeText>
          </S.Time>
        </S.Header>
        <S.Profile src={fromProfile} />
        <S.ContentsPreview>
          <S.BodyText>{message.mainText.replaceAll("\\n", "\n").slice(0, Math.min(Math.floor(message.mainText.length * 0.2), 8))}...</S.BodyText>
        </S.ContentsPreview>

        <S.ButtonContainer>
          <S.Button shine={distanceMessageAvailable} onClick={handleClick}>
            열기
          </S.Button>
          {!distanceMessageAvailable && (
            <>
              {messageDistance > 1000 ? (
                <S.NotAccessible color={message.color}>
                  {" "}
                  <p>메시지는 발신자가 설정한 내에서만 열람할 수 있습니다.</p>
                  <p>핀이 찍힌 위치 가까이로 가주세요.</p>
                </S.NotAccessible>
              ) : (
                <S.AlmostAccessible>
                  {" "}
                  <p>메시지까지 {Math.round(messageDistance)}m</p>
                  <p>100m내에서 열람 가능합니다.</p>
                </S.AlmostAccessible>
              )}
            </>
          )}
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
export default OpenMessageModalContents;
