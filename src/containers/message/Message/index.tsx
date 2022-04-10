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
import useAuth from "@U/hooks/useAuth";
import useGeoLocation from "@U/hooks/useGeoLocation";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Functions
import getDistance from "@U/functions/distance";

//middleware
import { fetchMessage, addMemberToChat, alterMessageTo, alterMessageReadState } from "@R/messages/middleware";
import { fetchChatsById } from "@R/chats/middleware";
import { actions } from "@R/users/state";

function Message({ chatId, messageId }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //login, if user is not log-inned
  // useEffect(() => {
  //   dispatch(actions.reset());
  // }, []);

  const user = useAppSelector((state) => state.users);
  const [userLoginned, setUserLoginned] = useState(false);
  const { signIn } = useAuth(`/message/${chatId}/${messageId}`);

  useEffect(() => {
    if (user.uid == null) {
      signIn();
    } else {
      setUserLoginned(true);
    }
  }, [user.uid]);

  // get chat information, check user accessibility
  const [userMessageAvailable, setUserMessageAvailable] = useState(false);

  async function getChat() {
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
  const [distanceMessageAvailable, setDistanceMessageAvailable] = useState(false);
  const [messageReady, setMessageReady] = useState(false);
  const [message, setMessage] = useState<any>(null);

  async function getMessage() {
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

  useEffect(() => {
    //lat lng
    if (message && message.latLngPos) {
      const distance = getDistance(message.latLngPos, pos);
      //Temporarily True for testing
      setDistanceMessageAvailable(distance < 50 ? true : true);
    }
  }, [message, pos]);

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
      {geoPermittedStatus ? (
        messageReady && distanceMessageAvailable && userMessageAvailable ? (
          <>
            <HeaderUtils messageToSend={message.messageFrom} latLng={message.latLng} messageFromReads={message.messageFrom === user.uid} />
            <MessageContents toName={message.toName} mainText={message.mainText.replaceAll("\\n", "\n")} color={message.color} font={message.font} image={message.imageUrl} music={message.musicUrl} />
          </>
        ) : (
          <>
            <ES.Text>
              <p>메시지는 버들골 내 핀 근처에서만 열람할 수 있습니다.</p>
              <p>핀이 찍힌 위치로 가서 메시지를 다시 열람해주세요.</p>
            </ES.Text>
            <ES.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</ES.ToMainButton>
          </>
        )
      ) : (
        <ES.Text>
          <p>잠시만 기다려주세요.</p>
          <p>장시간 로딩이 되지 않을경우,</p>
          <p>브라우저의 위치 접근 권한을 확인해주세요.</p>
          <ES.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</ES.ToMainButton>
        </ES.Text>
      )}
    </ES.Container>
  );
}
export default Message;
