import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//foundations
import ProfileSection from "@F/messenger/ProfileSection";

//navigate
import { useNavigate } from "react-router-dom";

//Functions
import { timeConverter, deltaTime } from "@U/functions/timeConverter";

//redux
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { Profile } from "@/foundations/modal/content/openMessage/OpenMessageModalContents/styles";

const SingleItem = ({ message, user, chatId, distancePerTime }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [messageISent, setMessageISent] = useState(false);

  useEffect(() => {
    retriveName();
  }, [message]);

  async function retriveName() {
    if (message.messageFrom === user.uid) {
      setMessageISent(true);
      setName(message.toName);
    } else {
      try {
        const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(message.messageFrom));
        setName(userInfo.payload.name);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <S.SingleMessage
      onClick={(ev) => {
        ev.stopPropagation();
        navigate(`/message/${chatId}/${message.messageId}/messenger`);
      }}
      left={deltaTime(message.createdAt) * distancePerTime}
    >
      <S.Name>{name}</S.Name>
      <ProfileSection message={message} messageISent={messageISent} />
      <S.Time>{message.read ? "읽음" : timeConverter(message.createdAt)}</S.Time>
    </S.SingleMessage>
  );
};

const SingleChatRow = ({ user, distancePerTime, messages, chatId }: any) => {
  return (
    <S.SingleRow>
      {messages.map((message: any, i: number) => (
        <SingleItem key={i} user={user} distancePerTime={distancePerTime} message={message} chatId={chatId} />
      ))}
    </S.SingleRow>
  );
};

export default SingleChatRow;
