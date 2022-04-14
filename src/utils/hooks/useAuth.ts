import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "@R/common/hooks";
import { actions } from "@/redux/users/state";
import { signInWithCustomToken } from "firebase/auth";
import { functions, auth } from "@U/initalizer/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

//https://festival-messenger-4df40.web.app
//http://localhost:3000

export const NO_PROFILE = "https://firebasestorage.googleapis.com/v0/b/festival-messenger-4df40.appspot.com/o/users%2FNO_PROFILE.png?alt=media&token=78d7f5fa-7f31-4779-ac50-2c746d1fc2d4";
export const redirectUri = "http://localhost:3000";

const useAuth = (navigateTo?: any) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => ({
    uid: state.users.uid,
    email: state.users.email,
    isLoading: state.users.isLoading,
    landingUrl: state.users.landingUrl || null,
    name: state.users.name || null,
    profileImage: state.users.profileImage || null,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("code=")[1];

    if (authorizeCodeFromKakao !== undefined) {
      dispatch(actions.setLoading(true));
      let kakaoAuth = httpsCallable(functions, "kakaoAuth");
      kakaoAuth({ code: authorizeCodeFromKakao })
        .then((result: any) => {
          let kakaoToken = result.data.kakao_token;
          let fireToken = result.data.firebase_token;

          signInWithCustomToken(auth, fireToken)
            .then((userCredential: any) => {
              window.Kakao.Auth.setAccessToken(kakaoToken);

              const derivedUser = userCredential.user;
              if (userCredential._tokenResponse.isNewUser) {
                console.log("new user");

                window.Kakao.API.request({
                  url: "/v2/user/me",
                  data: {
                    property_keys: ["kakao_account.profile"],
                  },
                  success: (res: any) => {
                    let output = res.kakao_account.profile;

                    //Nickname
                    dispatch(actions.setValue({ name: output.nickname }));
                    dispatch(actions.setValue({ profileImage: output.profile_image_url }));
                  },
                  fail: (err: any) => {
                    console.log(err);
                  },
                });
              } else {
                console.log("existing user");
              }

              dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email, token: kakaoToken }));
              dispatch(actions.setLoading(false));
              alert("로그인 완료!");
              navigate(user.landingUrl || "/settings");
            })
            .catch((error: any) => {
              console.log(error.code, error.message, error.details);
            });
        })
        .catch((error: any) => {
          console.log(error.message, error.details);
        });
    }
  }, [dispatch]);

  const signIn = useCallback(() => {
    if (navigateTo) {
      dispatch(actions.setLandingUrl(navigateTo));
    } else {
      dispatch(actions.setLandingUrl("/settings"));
    }
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
