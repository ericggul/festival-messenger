import React from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import useAuth from "@U/hooks/useAuth";
import { createNewChat, fetchAllMessages, fetchMessage, createNewMessage, deleteMessage, addMemberToChat } from "@R/messages/middleware";
import * as S from "./styles";

function CreateChat() {
  return <S.Container>CreateChat</S.Container>;
}
export default CreateChat;
