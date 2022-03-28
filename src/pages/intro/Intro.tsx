import React, { useEffect, useState } from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import { actions as chatActions } from "@R/chats/state";
import { actions as messageActions } from "@R/messages/state";
import useAuth from "@U/hooks/useAuth";

import { fetchChatsById, fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages, fetchMessage, createNewMessage, deleteMessage, addMemberToChat } from "@R/messages/middleware";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth();
  const dispatch = useAppThunkDispatch();

  console.log(useAppSelector((state) => state.chats));

  useEffect(() => {
    const test = async () => {
      try {
        const res = await dispatch(
          createNewMessage({
            chatId: "8hToHR5FdtvLHInJoRWb",
            messageText: "Hello Henry",
            messageFrom: {
              uid: user.uid,
            },
            messageTo: {
              uid: "external",
            },
          })
        ).unwrap();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };

    // test();
  }, [isAuthorized]);

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
