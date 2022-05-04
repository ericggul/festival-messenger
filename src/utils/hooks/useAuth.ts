import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "@R/common/hooks";
import { createUserInformation, fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { actions } from "@R/users/state";
import { signInWithCustomToken } from "firebase/auth";
import { functions, auth } from "@/utils/initializer/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

//Toast
import toast from "react-hot-toast";

//google analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

//https://festival-messenger-4df40.web.app
//http://localhost:3000

export const NO_PROFILE = "https://firebasestorage.googleapis.com/v0/b/festival-messenger-4df40.appspot.com/o/users%2FNO_PROFILE.png?alt=media&token=78d7f5fa-7f31-4779-ac50-2c746d1fc2d4";
export const redirectUri = "https://festival-messenger.com";

async function uploadUserInfo(dispatch: any, userInfo: any, navigate: any) {
  try {
    await dispatch(createUserInformation(userInfo)).unwrap();
  } catch (e) {
    alert("계정생성에 실패했습니다. 시크릿 브라우저에서 다시 로그인해주세요.");
    navigate("/login");
    console.log(e);
  }
}

function navigateUser(landingUrl: any, navigate: any) {
  if (landingUrl !== "/settings") {
    navigate(landingUrl);
  } else {
    navigate("/settings", {
      state: {
        initialUI: true,
      },
    });
  }
}

async function getUserInfo(dispatch: any, derivedUser: any, navigate: any, user: any) {
  try {
    const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(derivedUser.uid));
    const landingUrl = user.landingUrl || "/settings";

    if (!userInfo.payload) {
      console.log("new user!");
      window.Kakao.API.request({
        url: "/v2/user/me",
        data: {
          property_keys: ["kakao_account.profile"],
        },
        success: (res: any) => {
          let output = res.kakao_account;

          try {
            let profileImgURL: any = null;
            if (output.profile && output.profile.profile_image_url) {
              profileImgURL = output.profile.profile_image_url;
              if (profileImgURL && profileImgURL.includes(`http://`)) {
                profileImgURL = profileImgURL.replace(`http://`, `https://`);
              }
            }

            const userInfo = {
              id: derivedUser.uid,
              email: derivedUser.email || null,
              name: output.profile.nickname || "No Name",
              kakaoProfileImageUrl: profileImgURL,
            };

            uploadUserInfo(dispatch, userInfo, navigate);
            dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
            dispatch(actions.setValue({ name: output.profile.nickname || "No Name" }));
            dispatch(actions.setValue({ profileImage: profileImgURL || NO_PROFILE }));
            toast("로그인 완료!");
            dispatch(actions.setLoading(false));
            EventBehavior("Login", "New Login", "New User");
            navigateUser(landingUrl, navigate);
          } catch (e) {
            const userInfo = {
              id: derivedUser.uid,
              email: derivedUser.email || null,
              name: "No Name",
              kakaoProfileImageUrl: NO_PROFILE,
            };

            uploadUserInfo(dispatch, userInfo, navigate);
            dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
            dispatch(actions.setValue({ name: "No Name" }));
            dispatch(actions.setValue({ profileImage: NO_PROFILE }));
            dispatch(actions.setLoading(false));
            navigateUser(landingUrl, navigate);
          }
        },
        fail: (err: any) => {
          console.log(err);

          const userInfo = {
            id: derivedUser.uid,
            email: derivedUser.email || null,
            name: "No Name",
            kakaoProfileImageUrl: NO_PROFILE,
          };
          uploadUserInfo(dispatch, userInfo, navigate);
          dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
          dispatch(actions.setValue({ name: "No Name" }));
          dispatch(actions.setValue({ profileImage: NO_PROFILE }));
          dispatch(actions.setLoading(false));
          navigateUser(landingUrl, navigate);
        },
      });
    } else {
      console.log("existing user");

      //fetch data: to do?
      toast("로그인 완료!");
      dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
      dispatch(actions.setLoading(false));
      EventBehavior("Login", "New Login", "Existing User");

      navigate(user.landingUrl || "/settings");
    }
  } catch (e) {
    alert("계정생성에 실패했습니다. 시크릿 브라우저에서 다시 로그인해주세요.");
    dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email }));
    dispatch(actions.setLoading(false));
    navigate("/login");
  }
}

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

      toast("로그인 중!");
      let kakaoAuth = httpsCallable(functions, "kakaoAuth");
      kakaoAuth({ code: authorizeCodeFromKakao })
        .then((result: any) => {
          let kakaoToken = result.data.kakao_token;
          let fireToken = result.data.firebase_token;

          signInWithCustomToken(auth, fireToken)
            .then((userCredential: any) => {
              window.Kakao.Auth.setAccessToken(kakaoToken);
              const derivedUser = userCredential.user;
              getUserInfo(dispatch, derivedUser, navigate, user);
              dispatch(actions.setValue({ token: kakaoToken }));
            })
            .catch((error: any) => {
              dispatch(actions.setLoading(false));
              console.log(error.code, error.message, error.details);
            });
        })
        .catch((error: any) => {
          alert("다시 시도해주세요.");
          dispatch(actions.setLoading(false));
          navigate("/login");
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
      scope: "friends,talk_message,profile_nickname, profile_image,account_email",
    });
  }, [dispatch]);

  const isAuthorized = useMemo(() => {
    return !!(user.uid && !user.isLoading);
  }, [user]);

  return { signIn, user, isAuthorized };
};
export default useAuth;
