import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import { createUserInformation } from "@R/users/middleware";
import useInput from "@U/hooks/useInput";

//useModal
import useModal, { useAddImageModal } from "@U/hooks/useModal";
import LoadingModal from "@F/modal/content/LoadingModal";
import AddImageModal from "@F/modal/content/settings/AddImageModal";

//middleware
import { fetchUserInformation } from "@R/users/middleware";
//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";

import * as S from "./styles";

function Settings() {
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppThunkDispatch();
  console.log(user.profileImage);

  const { modalComponent, isModalOpen, setIsModalOpen, imageFile, image, setImage, setImageFile } = useAddImageModal(AddImageModal, true, {}, createUserInfo);
  const { value: name, onChange: onNameChange, setValue: setName } = useInput(user.name || "");

  async function fetchUserProfile() {
    try {
      const res = await dispatch(fetchUserInformation(user.uid)).unwrap();
      setImage(res.profileImage);
      setName(res.name);
    } catch (e) {
      console.log(e);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (user.uid) {
      fetchUserProfile();
    } else {
      alert("로그인이 필요합니다.");
      navigate(`/login`);
    }
  }, [user.uid]);

  const { modalComponent: loadingModalComponent, isModalOpen: loading, setIsModalOpen: setLoading } = useModal(LoadingModal);

  async function createUserInfo() {
    console.log("user info");
    setLoading(true);
    const userInfo = {
      id: user.uid,
      email: user.email,
      name: name,
      profileImage: imageFile,
      kakaoProfileImageUrl: user.profileImage,
    };
    try {
      const res = await dispatch(createUserInformation(userInfo)).unwrap();
      alert("저장 완료!");
      setLoading(false);
    } catch (e) {
      alert("오류 발생!");
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <>
      <S.BackgroundImage src={image} />
      <S.Container>
        <S.ImageContainer>
          <S.Image src={image} />
          <S.ChangeContainer onClick={() => setIsModalOpen(true)}>
            <S.Change src={ChangeIcon} />
          </S.ChangeContainer>
        </S.ImageContainer>

        <S.InputBox value={name} onChange={onNameChange} />
        <S.SaveButton onClick={createUserInfo}>저장</S.SaveButton>
      </S.Container>
      {modalComponent}
      {loadingModalComponent}
    </>
  );
}
export default Settings;
