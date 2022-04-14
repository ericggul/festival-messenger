import React, { useEffect, useState } from "react";
import * as S from "./styles";

import { GuideText } from "@F/writeMessage/addImage/BeforeInputImage";

import Cancel from "@I/icons/modal/cancel.svg";

function AddMusicModal({ setIsModalOpen, setImageFile, setImage }: any) {
  //0: Before Upload
  //1: Uploading
  //2: Upload Completed
  const [uploadState, setUploadState] = useState(0);

  const onImageChange = (e: any) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 1048576 * 1) {
        alert("프로필 사진은 1MB 이하로 선택해주세요.");
        return;
      }
      setUploadState(1);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      setUploadState(2);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <S.Background />
      <S.Box>
        <S.CloseButton
          onClick={(ev) => {
            ev.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>

        <S.Container>
          {uploadState === 0 && (
            <>
              <S.Title>추가할 프로필 사진을 선택하세요</S.Title>
              <S.ImageBox>
                <S.ImageInput onChange={onImageChange} />
                <S.GuideText>{"+ 사진 추가하기"}</S.GuideText>
              </S.ImageBox>
            </>
          )}
          {uploadState === 1 && <S.Title>업로드중...</S.Title>}
          {uploadState === 2 && <S.Title>업로드 중이에요!</S.Title>}
        </S.Container>
      </S.Box>
    </>
  );
}
export default AddMusicModal;
