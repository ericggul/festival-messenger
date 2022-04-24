import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppThunkDispatch, useAppSelector } from "@R/common/hooks";
import { createUserInformation } from "@R/users/middleware";
import useInput from "@U/hooks/useInput";

import { NO_PROFILE } from "@U/hooks/useAuth";

//containers
import InitialImageContainer from "@F/settings/InitialImageContainer";
import DefaultImageContainer from "@F/settings/DefaultImageContainer";

//useModal
import useModal, { useAddImageModal } from "@U/hooks/useModal";
import LoadingModal from "@F/modal/content/LoadingModal";
import AddImageModal from "@F/modal/content/settings/AddImageModal";

//middleware
import { fetchUserInformation } from "@R/users/middleware";

import * as S from "./styles";

function Settings() {
  //Two types of UI
  //1. Initial UI(Where User can select btw kakao talk and custom)
  //2. Default UI
  const [initialUI, setInitialUI] = useState(true);

  //background loading
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  const user = useAppSelector((state) => state.users);
  const dispatch = useAppThunkDispatch();

  const { modalComponent, isModalOpen, setIsModalOpen, imageFile, image, setImage, setImageFile } = useAddImageModal(AddImageModal, true, {}, createUserInfo);
  const { value: name, onChange: onNameChange, setValue: setName } = useInput(user.name || "");

  async function fetchUserProfile() {
    try {
      const res = await dispatch(fetchUserInformation(user.uid)).unwrap();
      setImage(res.profileImage || NO_PROFILE);
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
    setLoading(true);
    const userInfo = {
      id: user.uid,
      email: user.email,
      name: name,
      profileImage: imageFile,
      kakaoProfileImageUrl: user.profileImage,
    };
    try {
      await dispatch(createUserInformation(userInfo)).unwrap();
      alert("저장 완료!");
      setInitialUI(false);
      setLoading(false);
    } catch (e) {
      alert("오류 발생!");
      setLoading(false);
      console.log(e);
    }
  }

  const handleSaveButtonClick = () => {
    createUserInfo();
    navigate("/map");
  };

  return (
    <>
      {initialUI ? <S.InitialBackgroud /> : <S.BackgroundImage image={image} backgroundLoading={backgroundLoading} onLoad={() => setBackgroundLoading(false)} />}

      <S.Container>
        {initialUI && (
          <S.ExplText>
            <h1> 프로필 사진을 선택해주세요</h1>
            <p>기존 카카오톡 프로필 혹은 새로운 프로필 사진을</p>
            <p>선택할 수 있습니다.</p>
          </S.ExplText>
        )}
        {initialUI ? <InitialImageContainer image={image} setIsModalOpen={setIsModalOpen} /> : <DefaultImageContainer image={image} setIsModalOpen={setIsModalOpen} />}
        <S.InputBox value={name} onChange={onNameChange} />
        <S.SaveButton onClick={handleSaveButtonClick}>저장</S.SaveButton>
      </S.Container>
      {modalComponent}
      {loadingModalComponent}
    </>
  );
}
export default Settings;
