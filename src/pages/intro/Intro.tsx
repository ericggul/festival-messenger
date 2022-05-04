import React, { useEffect, useState } from "react";
import useAuth from "@U/hooks/useAuth";
import LoadingContainer from "@C/Loading";
import * as ES from "@S/style/common/errorPage";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

export default function Intro() {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user.uid && !user.isLoading) {
      navigate("/map");
    } else if (!user.isLoading) {
      navigate("/login");
    }
  }, [user.isLoading]);
  return (
    <>
      <Helmet>
        <title>페스티벌 메신저</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="버들골에서만 읽을 수 있는 네 마음" />
        <meta property="og:image" content="https://festival-messenger.com/logo512.png" />
      </Helmet>
      <div>
        {user.isLoading ? (
          <LoadingContainer />
        ) : (
          <ES.Container>
            <ES.Text>이 페이지에는 별게 없어요!!</ES.Text>
            <ES.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</ES.ToMainButton>
          </ES.Container>
        )}
      </div>
    </>
  );
}
