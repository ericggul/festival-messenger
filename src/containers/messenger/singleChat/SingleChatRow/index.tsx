import React, { useEffect, useState, useRef, useMemo } from "react";
import * as S from "./styles";

//foundations
import ProfileSection from "@F/messenger/ProfileSection";

//navigate
import { useNavigate } from "react-router-dom";

//Functions
import { timeConverter, deltaTime, deltaTimeForDeltaArray } from "@U/functions/timeConverter";

//redux
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//icons
import Plus from "@I/icons/messenger/plus.svg";

//analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

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
        EventBehavior("Messenger", "Read Message", "Read Message via Messenger");
        navigate(`/message/${chatId}/${message.messageId}/messenger`);
      }}
      left={deltaTime(message.createdAt) * distancePerTime}
      read={message.read}
    >
      <S.Name>{name}</S.Name>
      <ProfileSection message={message} messageISent={messageISent} />
      <S.Time>{message.read ? (message.messageFrom === user.uid ? "읽혀짐" : "읽음") : timeConverter(message.createdAt)}</S.Time>
    </S.SingleMessage>
  );
};

const SingleChatRow = ({ user, distancePerTime, messages, chat }: any) => {
  //To do: algorithm that detects adjacent neighbor
  const messengerDeltaArray = useMemo(() => messages.map((msg: any) => (distancePerTime * msg.createdAt.seconds) / (60 * 60)), [messages]);
  const [refinedDeltaArray, setRefinedDeltaArray] = useState(messengerDeltaArray);

  useEffect(() => {
    const reducedArray = messengerDeltaArray.reduce((prev: any, curr: any) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (curr - last.center < 2) {
          const newLast = { center: (last.center * last.number + curr) / (last.number + 1), number: last.number + 1 };
          prev.pop();
          prev.push(newLast);
          return prev;
        } else {
          prev.push({ center: curr, number: 1 });
          return prev;
        }
      } else {
        return [{ center: curr, number: 1 }];
      }
    }, []);

    setRefinedDeltaArray(reducedArray);
  }, [messengerDeltaArray]);

  refinedDeltaArray.forEach((center: any) => deltaTimeForDeltaArray(center));

  //navigate to map
  const navigate = useNavigate();
  const handleAddMessageButtonClick = () => {
    EventBehavior("Messenger", "Add Button", "Add Message via Add Button");
    let filteredChatMembers = chat.members.filter((member: any) => member !== user.uid);

    navigate(`/map`, {
      state: {
        focusAddMessageButton: true,
        addMessageTo: filteredChatMembers.length === 0 ? null : filteredChatMembers[0],
      },
    });
  };

  return (
    <S.SingleRow>
      <S.RowLine length={deltaTime(messages[0].createdAt) * distancePerTime} />
      {deltaTime(messages[messages.length - 1].createdAt) * distancePerTime > 3 && (
        <S.AddMessageButton onClick={handleAddMessageButtonClick}>
          <S.Icon src={Plus} />
        </S.AddMessageButton>
      )}
      {messages.map((message: any, i: number) => (
        <SingleItem key={i} user={user} distancePerTime={distancePerTime} message={message} chatId={chat.chatId} />
      ))}
    </S.SingleRow>
  );
};

export default SingleChatRow;
