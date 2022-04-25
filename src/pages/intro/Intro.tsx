import React, { useEffect, useState } from "react";
import useAuth from "@U/hooks/useAuth";
import LoadingContainer from "@C/Loading";
import * as ES from "@S/style/common/errorPage";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@R/common/hooks";

export default function Intro() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!user.isLoading) {
      navigate("/map");
    }
  }, [user.isLoading]);
  return (
    <div>
      {user.isLoading ? (
        <LoadingContainer />
      ) : (
        <ES.Container>
          <ES.Text>잘못된 접근입니다.</ES.Text>
          <ES.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</ES.ToMainButton>
        </ES.Container>
      )}
    </div>
  );
}
