import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { fetchUserInformationWithoutUpdatingRedux, createUserInformation } from "@R/users/middleware";
import { useEffect, useState } from "react";

async function uploadUserInfo(dispatch: any, userInfo: any) {
  try {
    await dispatch(createUserInformation(userInfo));
  } catch (e) {
    console.log(e);
  }
}

export default function Test() {
  useEffect(() => {
    getUser();
  }, []);

  //kakao:2219381660
  //kakao:2164482043

  //kakao:2164482043
  const dispatch = useAppDispatch();
  async function getUser() {
    try {
      const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux("kakao:2219381660"));

      await uploadUserInfo(dispatch, {
        id: "kakao:2219381660",
        name: "No Name",
        kakaoProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/festival-messenger-4df40.appspot.com/o/users%2FNO_PROFILE.png?alt=media&token=78d7f5fa-7f31-4779-ac50-2c746d1fc2d4",
      });
    } catch (e) {
      console.log(e);
    }
  }

  return <div></div>;
}
