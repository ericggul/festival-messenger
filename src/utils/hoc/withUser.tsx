import React from "react";
import useAuth, { useUser } from "@U/hooks/useAuth";

function withUser(InputComponent: any) {
  return function ResultComponent(props: any) {
    useAuth(); // NOTE: 유저가 바뀔 때를 useEffect 로 감지하기 위함.
    const { user, isAuthorized } = useUser();

    return (
      <>
        {user.isLoading && <div style={{ width: "100vw", height: "100vh" }}>{"로그인 중입니다..."}</div>}
        <InputComponent {...props} user={user} isAuthorized={isAuthorized} />
      </>
    );
  };
}
export default withUser;
