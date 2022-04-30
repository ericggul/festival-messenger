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

async function uploadUserInfo(dispatch: any, userInfo: any) {
  try {
    await dispatch(createUserInformation(userInfo)).unwrap();
  } catch (e) {
    console.log(e);
  }
}

async function getUserInfo(dispatch: any, derivedUser: any, navigate: any, user: any) {
  try {
    const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(derivedUser.uid));
    console.log(userInfo.payload);

    if (!userInfo.payload) {
      console.log("new user!");
      window.Kakao.API.request({
        url: "/v2/user/me",
        data: {
          property_keys: ["kakao_account.profile"],
        },
        success: (res: any) => {
          console.log("res", res);
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

            uploadUserInfo(dispatch, userInfo);
            dispatch(actions.setValue({ name: output.profile.nickname || "No Name" }));
            dispatch(actions.setValue({ profileImage: profileImgURL || NO_PROFILE }));

            toast("로그인 완료!");
            EventBehavior("Login", "New Login", "New User");

            if (user.landingUrl !== "/settings") {
              navigate(user.landingUrl);
            } else {
              navigate("/settings", {
                state: {
                  initialUI: true,
                },
              });
            }
          } catch (e) {
            const userInfo = {
              id: derivedUser.uid,
              email: derivedUser.email || null,
              name: "No Name",
              kakaoProfileImageUrl: NO_PROFILE,
            };

            uploadUserInfo(dispatch, userInfo);
            dispatch(actions.setValue({ name: "No Name" }));
            dispatch(actions.setValue({ profileImage: NO_PROFILE }));

            if (user.landingUrl !== "/settings") {
              navigate(user.landingUrl);
            } else {
              navigate("/settings", {
                state: {
                  initialUI: true,
                },
              });
            }
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

          uploadUserInfo(dispatch, userInfo);
          dispatch(actions.setValue({ name: "No Name" }));
          dispatch(actions.setValue({ profileImage: NO_PROFILE }));

          if (user.landingUrl !== "/settings") {
            navigate(user.landingUrl);
          } else {
            navigate("/settings", {
              state: {
                initialUI: true,
              },
            });
          }
        },
      });
    } else {
      console.log("existing user");

      //fetch data: to do?
      toast("로그인 완료!");
      EventBehavior("Login", "New Login", "Existing User");

      navigate(user.landingUrl || "/settings");
    }
  } catch (e) {
    console.log(e);
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

              console.log(kakaoToken);
              dispatch(actions.setValue({ uid: derivedUser.uid, email: derivedUser.email, token: kakaoToken }));
              dispatch(actions.setLoading(false));
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
      scope: "friends,talk_message,profile_nickname, profile_image,account_email",
    });
  }, [dispatch]);

  const isAuthorized = useMemo(() => {
    return !!(user.uid && !user.isLoading);
  }, [user]);

  return { signIn, user, isAuthorized };
};
export default useAuth;
