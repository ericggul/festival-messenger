import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@R/common/hooks";
import { actions } from "@R/chats/state";
import useAuth from "@U/hooks/useAuth";

export default function Intro() {
  const { signIn, user, isAuthorized } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.createNewChat({ members: "hey" }));
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
