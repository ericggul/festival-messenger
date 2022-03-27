import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@R/common/hooks";
import { actions } from "@R/chats/state";
import useAuth from "@U/hooks/useAuth";

import { fetchChatsFromFirestore, fetchChatsByMemberFromFirestore, createNewChat } from "@R/chats/api";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth();
  const dispatch = useAppDispatch();

  const [chatId, setChatId] = useState("");

  useEffect(() => {
    dispatch(actions.createNewChat({ members: "hey" }));

    fetchChatsByMemberFromFirestore(user.uid)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("error");
      });

    // createNewChat([user.uid])
    //   .then((res) => {
    //     setChatId(res);
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
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
