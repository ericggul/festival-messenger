import React from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import useAuth from "@U/hooks/useAuth";
import { createNewChat, fetchAllMessages, fetchMessage, createNewMessage, alterMessageReadState, deleteMessage, addMemberToChat } from "@R/messages/middleware";
import * as S from "./styles";
import useGeoLocation from "@U/hooks/useGeoLocation";

function CreateChat() {
  const { signIn, user, isAuthorized } = useAuth();
  const chats = useAppSelector((state) => state.messages);

  const { pos: geoLocation, permittedStatus } = useGeoLocation();

  const dispatch = useAppThunkDispatch();
  console.log(chats);

  async function createChat() {
    const membersArray = [
      { id: user.uid, name: "Name" },
      { id: "temp", name: "temp" },
    ];
    try {
      const res = await dispatch(createNewChat(membersArray)).unwrap();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchMessages() {
    try {
      const res = await dispatch(fetchAllMessages(chats.chatId)).unwrap();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function addMember() {
    const membersArray = [
      { id: user.uid, name: "Name" },
      { id: "changed!", name: "changed!" },
    ];
    try {
      const res = await dispatch(addMemberToChat({ chatId: chats.chatId, members: membersArray })).unwrap();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function createMessage() {
    try {
      const res = await dispatch(
        createNewMessage({
          chatId: chats.chatId,
          messageText: "Hello Henry",
          messageFrom: chats.members[0],
          messageTo: chats.members[1],
          latLngPos: geoLocation,
        })
      ).unwrap();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function changeReadStatus() {
    try {
      const res = await dispatch(
        alterMessageReadState({
          chatId: chats.chatId,
          messageId: chats.messages[0].messageId,
          newReadState: true,
        })
      ).unwrap();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return <S.Container>CreateChat</S.Container>;
}
export default CreateChat;
