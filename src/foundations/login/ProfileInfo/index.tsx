import React, { useState, useEffect } from "react";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import { createUserInformation } from "@R/users/middleware";
import useInput from "@U/hooks/useInput";

import * as S from "./styles";

function ProfileInfo() {
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppThunkDispatch();

  //Image to be displayed
  const [image, setImage] = useState(user.profileImage || "");
  //Image to be uploaded to firestore
  const [imageFile, setImageFile] = useState<any>(!null);
  const { value: name, onChange: onNameChange, setValue: setName } = useInput(user.name || "");

  useEffect(() => {
    setImage(user.profileImage);
  }, [user.profileImage]);
  useEffect(() => {
    //Unauthorized: ToDo
    if (!user.uid) {
    }
  }, [user.uid]);

  function onImageChange(e: any) {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      createUserInfo();
    }
  }

  async function createUserInfo() {
    const userInfo = {
      id: user.uid,
      email: user.email,
      name: name,
      profileImage: imageFile,
      kakaoProfileImageUrl: user.profileImage,
    };
    try {
      const res = await dispatch(createUserInformation(userInfo)).unwrap();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <S.Container>
      <img src={image} />
      <S.InputBox value={name} onChange={onNameChange} />
      <input type="file" accept="image/png, image/jpeg, image/jpg, image/svg" onChange={onImageChange} />
      <S.CompleteButton onClick={createUserInfo}>Completed</S.CompleteButton>
    </S.Container>
  );
}
export default ProfileInfo;
