import React, { useEffect, useState } from "react";
import useAuth from "@U/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { actions } from "@R/users/state";
import LoadingContainer from "@C/Loading";
import * as ES from "@S/style/common/errorPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Helmet } from "react-helmet";

export default function Intro() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const userLoading = useAppSelector((state) => state.usersLoading.isLoading);

  useEffect(() => {
    if (user.uid && !userLoading) {
      navigate("/map");
    } else if (!userLoading) {
      navigate("/about");
    } else {
      const timeout = setTimeout(() => {
        if (window.confirm("로그인이 예상보다 오래 걸리고 있습니다. 다시 로그인을 시도해 보시겠습니까?")) {
          navigate("/login");
          dispatch(actions.setLoading(false));
        }
      }, 60000);
      return () => clearTimeout(timeout);
    }
  }, [user, userLoading]);
  return (
    <>
      <Helmet>
        <title>페스티벌 메신저</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="버들골에서만 읽을 수 있는 네 마음" />
        <meta property="og:image" content="https://festival-messenger.com/logo512.png" />
      </Helmet>
      <div>
        {userLoading ? (
          <LoadingContainer />
        ) : (
          <ES.Container>
            <ES.Text>
              <p>버들골에서만 읽을 수 있는 시크릿 메신저</p>
              <p>페스티벌 메신저에 오신 것을 환영합니다.</p>
            </ES.Text>
            <ES.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</ES.ToMainButton>
          </ES.Container>
        )}
      </div>
    </>
  );
}
