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

const SingleItem = ({ message, user, chatId, distancePerTime, deltaTimeFromLast }: any) => {
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

  console.log(deltaTimeFromLast * distancePerTime);
  return (
    <S.SingleMessage
      onClick={(ev) => {
        ev.stopPropagation();
        navigate(`/message/${chatId}/${message.messageId}/messenger`);
      }}
      left={deltaTime(message.createdAt) * distancePerTime}
      read={message.read}
    >
      <S.Name>{deltaTimeFromLast * distancePerTime > 2 && name}</S.Name>
      <ProfileSection message={message} messageISent={messageISent} />
      <S.Time>{deltaTimeFromLast * distancePerTime > 2 && (message.read ? "읽음" : timeConverter(message.createdAt))}</S.Time>
    </S.SingleMessage>
  );
};

const SingleChatRow = ({ user, distancePerTime, messages, chatId }: any) => {
  //To do: algorithm that detects adjacent neighbor

  return (
    <S.SingleRow>
      {messages.map((message: any, i: number) => (
        <SingleItem
          key={i}
          user={user}
          distancePerTime={distancePerTime}
          message={message}
          chatId={chatId}
          deltaTimeFromLast={i > 0 ? (message.createdAt.seconds - messages[i - 1].createdAt.seconds) / (60 * 60) : 5000}
        />
      ))}
    </S.SingleRow>
  );
};

export default SingleChatRow;
