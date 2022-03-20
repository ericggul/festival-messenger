import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/users/state";
import { signInWithCustomToken } from "firebase/auth";
import { functions, auth } from "@U/initalizer/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const useAuth = () => {
  const redirectUri = "http://localhost:3001";

  const dispatch = useDispatch();

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("code=")[1];
    if (authorizeCodeFromKakao !== undefined) {
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
              const user = userCredential.user;
              if (userCredential._tokenResponse.isNewUser) {
                console.log("new user");
              } else {
                console.log("existing user");
              }

              console.log(user);
              dispatch(actions.setValue({ uid: user.uid }));
              dispatch(actions.setValue({ email: user.email }));
            })
            .catch((error: any) => {
              console.log(error.code, error.message, error.details);
            });
        })
        .catch((error: any) => {
          console.log(error.message, error.details);
        });

      dispatch(actions.setLoading(false));
    }
  }, [dispatch]);

  const signIn = useCallback(() => {
    dispatch(actions.setLoading(true));
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
    });
  }, [dispatch]);

  return { signIn };
};
export default useAuth;

export const useUser = () => {
  const user = useSelector((state: any) => ({
    uid: state.users.uid,
    email: state.users.email,
    isLoading: state.users.isLoading,
  }));
  const isAuthorized = useMemo(() => {
    return !!(user.uid && !user.isLoading);
  }, [user]);

  return { user, isAuthorized };
};
