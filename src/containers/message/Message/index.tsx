import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import * as ES from "@S/style/common/errorPage";

//React router usenavigate
import { useNavigate } from "react-router-dom";

//containers
import MessageContents from "@C/message/MessageContents";

//foundations
import HeaderUtils from "@F/message/HeaderUtils";

//hooks
import useDistanceAvailability from "@U/hooks/messages/useDistanceAvailability";
import useGeoLocation from "@U/hooks/useGeoLocation";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//middleware
import { fetchMessage, addMemberToChat, alterMessageTo, alterMessageReadState } from "@R/messages/middleware";
import { fetchChatsById } from "@R/chats/middleware";

function Message({ chatId, messageId, navigationComingFrom = "map" }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //login, if user is not log-inned

  const user = useAppSelector((state) => state.users);
  const [userLoginned, setUserLoginned] = useState(false);

  useEffect(() => {
    if (user.uid == null) {
      alert("로그인 후 메시지를 열람할 수 있습니다.");
      navigate(`/login`, {
        state: {
          navigateTo: `/message/${chatId}/${messageId}`,
        },
      });
    } else {
      setUserLoginned(true);
    }
  }, [user.uid]);

  // get chat information, check user accessibility
  const [userMessageAvailable, setUserMessageAvailable] = useState(false);

  async function getChat() {
    console.log("Get Chat!");
    try {
      const res = await dispatch(fetchChatsById(chatId));
      let members = res.payload.members;

      //If already more than two members are joined in chat
      if (members.length >= 2) {
        if (members.includes(user.uid)) {
          setUserMessageAvailable(true);
        } else {
          //Reject if user has no credential
          alert("접근 권한이 없습니다!");
        }
      } else {
        //If there is only one member, add current user to the chat
        members.push(user.uid);
        await dispatch(addMemberToChat({ chatId, members }));
        await dispatch(alterMessageTo({ chatId, messageId, newMessageTo: user.uid }));
        setUserMessageAvailable(true);
      }
    } catch (e) {
      alert("대화내역이 존재하지 않습니다.");
    }
  }
  useEffect(() => {
    if (userLoginned) {
      getChat();
    }
  }, [userLoginned]);

  //get message information, check location accessibility
  //geo location
  const { pos, permittedStatus: geoPermittedStatus } = useGeoLocation();
  const [messageReady, setMessageReady] = useState(false);
  const [message, setMessage] = useState<any>(null);

  async function getMessage() {
    console.log("Get Message!");
    try {
      const res = await dispatch(fetchMessage({ chatId, messageId }));
      setMessage(res.payload);
      if (res.payload) {
        setMessageReady(true);
      } else {
        alert("메시지가 존재하지 않습니다.");
      }
    } catch (e) {
      alert("메시지가 존재하지 않습니다.");
      console.log(e);
    }
  }

  useEffect(() => {
    //get message by id if user message available
    if (userMessageAvailable) {
      getMessage();
    }
  }, [chatId, messageId, userMessageAvailable]);

  //get distance message availability
  const distanceMessageAvailable = useDistanceAvailability(pos, user, message);

  //change the read state of message to 'true'
  useEffect(() => {
    if (messageReady && geoPermittedStatus && distanceMessageAvailable) {
      if (message.messageFrom !== user.uid) {
        dispatch(alterMessageReadState({ chatId, messageId, newReadState: true }));
      }
    }
  }, [message, geoPermittedStatus, distanceMessageAvailable, userMessageAvailable]);

  return (
    <ES.Container>
      {userMessageAvailable ? (
        geoPermittedStatus ? (
          messageReady && distanceMessageAvailable && userMessageAvailable ? (
            <>
              <HeaderUtils messageToSend={message.messageFrom} latLng={message.latLng} messageFromReads={message.messageFrom === user.uid} navigationComingFrom={navigationComingFrom} />
              <MessageContents
                toName={message.toName}
                mainText={message.mainText.replaceAll("\\n", "\n")}
                color={message.color}
                font={message.font}
                image={message.imageUrl}
                music={message.musicUrl}
              />
            </>
          ) : (
            <>
              <ES.Text>
                <p>메시지는 버들골 내 핀 근처에서만 열람할 수 있습니다.</p>
                <p>핀이 찍힌 위치로 가서 메시지를 다시 열람해주세요.</p>
              </ES.Text>
              <ES.ToMainButton onClick={() => navigate(`/${navigationComingFrom}`)}>{navigationComingFrom === "messenger" ? "메신저로" : "메인으로"} 가기</ES.ToMainButton>
            </>
          )
        ) : (
          <ES.Text>
            <p>잠시만 기다려주세요.</p>
            <p>장시간 로딩이 되지 않을경우,</p>
            <p>브라우저의 위치 접근 권한을 확인해주세요.</p>
            <ES.ToMainButton onClick={() => navigate(`/${navigationComingFrom}`)}>{navigationComingFrom === "messenger" ? "메신저로" : "메인으로"} 가기</ES.ToMainButton>
          </ES.Text>
        )
      ) : (
        <ES.Text>
          <p> 메시지 접근 권한이 없습니다.</p>
          <p>로그인이 되지 않은 경우 로그인해주세요.</p>
          <p>브라우저별 한 계정만 로그인 가능합니다.</p>
          <ES.ToMainButton
            onClick={() =>
              navigate(`/login`, {
                state: {
                  navigateTo: `/message/${chatId}/${messageId}`,
                },
              })
            }
          >
            로그인하러 가기
          </ES.ToMainButton>
        </ES.Text>
      )}
    </ES.Container>
  );
}
export default Message;
