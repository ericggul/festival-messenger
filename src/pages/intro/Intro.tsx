import React, { useEffect, useState } from "react";
import { useAppThunkDispatch } from "@R/common/hooks";
import { actions } from "@R/chats/state";
import useAuth from "@U/hooks/useAuth";

import { fetchChatsById, fetchChatsByMember, createNewChat, addMemberToChat } from "@R/chats/middleware";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth();
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const test = async () => {
      try {
        await dispatch(addMemberToChat({ chatId: "8hToHR5FdtvLHInJoRWb", member: "testMemeber" })).unwrap();
      } catch (e) {
        console.log(e);
      }
    };

    test();
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
