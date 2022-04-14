import React, { useEffect, useState } from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import useAuth from "@U/hooks/useAuth";

import { actions } from "@R/users/state";
import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages, fetchMessage, createNewMessage, deleteMessage, addMemberToChat } from "@/redux/messages/middleware";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth("/settings");
  const dispatch = useAppThunkDispatch();

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
          </>
        </>
      )}
    </div>
  );
}
