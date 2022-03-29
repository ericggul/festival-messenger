import React, { useEffect, useState } from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import useAuth from "@U/hooks/useAuth";
import CreateChat from "@F/CreateChat";
import { actions } from "@R/users/state";
import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages, fetchMessage, createNewMessage, deleteMessage, addMemberToChat } from "@R/messages/middleware";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth();
  const dispatch = useAppThunkDispatch();

  console.log(useAppSelector((state) => state.messages));

  return (
    <div>
      {user.isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {" "}
          <>
            <div onClick={signIn}>인트로</div>
            <div>{isAuthorized ? "Hello" : "Log in"}</div>
            {isAuthorized && <CreateChat />}
          </>
        </>
      )}
    </div>
  );
}
