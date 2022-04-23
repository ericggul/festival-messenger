import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//containers
import TimeSection from "@C/messenger/TimeSection";
import SingleChat from "@C/messenger/singleChat/SingleChat";

//Foundations
import FooterNote from "@F/messenger/FooterNote";

//navigate
import { useNavigate } from "react-router-dom";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//hooks
import usePinchGestures from "@U/hooks/usePinchGestures";

//functions
import { deltaTime, SEVENTY_TWO_HOURS } from "@U/functions/timeConverter";

function Messenger() {
  //layout related
  const distance = usePinchGestures();

  //time Interval: Hours
  //How long 1 hour is in display
  const [distancePerTime, setDistancePerTimeInterval] = useState(1);
  //How much time interval is setted in a Time Section
  const [timeInterval, setTimeInterval] = useState(6);
  //Display Recent 72 hours result
  const [maxTimeBefore, setMaxTimeBefore] = useState(72);

  useEffect(() => {
    setDistancePerTimeInterval((itv) => Math.max(Math.min(distance ** 0.1 * itv, 40), 0.1));
  }, [distance]);

  useEffect(() => {
    let inverseDistance = 6 / distancePerTime;
    if (inverseDistance < 0.7) {
      setTimeInterval(0.5);
    } else if (inverseDistance < 2) {
      setTimeInterval(1);
    } else if (inverseDistance < 4) {
      setTimeInterval(3);
    } else if (inverseDistance < 9) {
      setTimeInterval(6);
    } else if (inverseDistance < 18) {
      setTimeInterval(12);
    } else if (inverseDistance < 36) {
      setTimeInterval(24);
    } else {
      setTimeInterval(72);
    }
  }, [distancePerTime]);

  //data related
  //retriving chat
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.users);
  const chatsReduxState = useAppSelector((state) => state.chats);
  const [currentChats, setCurrentChats] = useState(chatsReduxState.chats);
  const [chatLoaded, setChatLoaded] = useState(false);

  useEffect(() => {
    if (!user.uid) {
      navigate("/login");
      return;
    }
    retriveChat();
  }, [user]);

  async function retriveChat() {
    try {
      let res = await dispatch(fetchChatsByMember(user.uid));

      setCurrentChats(sortChat(res.payload));
      setChatLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }

  function sortChat(chats: any) {
    return chats.filter((chat: any) => deltaTime(chat.lastUpdatedAt) < SEVENTY_TWO_HOURS).sort((a: any, b: any) => b.lastUpdatedAt.seconds - a.lastUpdatedAt.seconds);
  }

  useEffect(() => {
    if (currentChats.length === 0) {
      alert("메시지가 없습니다!");
      navigate("/map");
    }
  }, [currentChats]);

  return (
    <S.Container>
      <S.InnerContainer>
        <S.Note>
          <p>주의! 모든 메시지는 전송시점 기준 72시간 후에 사라집니다!</p>
        </S.Note>
        <TimeSection maxTimeBefore={maxTimeBefore} timeInterval={timeInterval} distancePerTime={distancePerTime} />
        <S.ChatContainer>{chatLoaded && currentChats.map((chat, i) => <SingleChat distancePerTime={distancePerTime} chat={chat} user={user} key={i} />)}</S.ChatContainer>
        <FooterNote />
      </S.InnerContainer>
    </S.Container>
  );
}
export default Messenger;
