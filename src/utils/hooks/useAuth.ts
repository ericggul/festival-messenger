import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "@R/common/hooks";
import { actions } from "@/redux/users/state";
import { signInWithCustomToken } from "firebase/auth";
import { functions, auth } from "@U/initalizer/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const redirectUri = "http://localhost:3000";

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => ({
    uid: state.users.uid,
    email: state.users.email,
    isLoading: state.users.isLoading,
  }));

  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("code=")[1];

    if (authorizeCodeFromKakao !== undefined && user.uid == (null || undefined)) {
      dispatch(actions.setLoading(true));
      let kakaoAuth = httpsCallable(functions, "kakaoAuth");
      kakaoAuth({ code: authorizeCodeFromKakao })
        .then((result: any) => {
          console.log(result);
          let kakaoToken = result.data.kakao_token;
          let fireToken = result.data.firebase_token;

          signInWithCustomToken(auth, fireToken)
            .then((userCredential: any) => {
              window.Kakao.Auth.setAccessToken(kakaoToken);
              console.log(userCredential);
              const derivedUser = userCredential.user;
              if (userCredential._tokenResponse.isNewUser) {
                console.log("new user");
              } else {
                console.log("existing user");
              }

              dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
              dispatch(actions.setLoading(false));

              window.Kakao.API.request({
                url: "/v1/api/talk/friends",
                success: (res: any) => {
                  console.log(res);
                },
                fail: (err: any) => {
                  console.log(err);
                },
              });

              navigate("/");
            })
            .catch((error: any) => {
              console.log(error.code, error.message, error.details);
            });
        })
        .catch((error: any) => {
          console.log(error.message, error.details);
        });
    } else if (authorizeCodeFromKakao !== undefined && user.uid) {
      navigate("/");
    }
  }, [dispatch]);

  const signIn = useCallback(() => {
    dispatch(actions.setLoading(true));
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
    });
  }, [dispatch]);

  const isAuthorized = useMemo(() => {
    return !!(user.uid && !user.isLoading);
  }, [user]);

  return { signIn, user, isAuthorized };
};
export default useAuth;
