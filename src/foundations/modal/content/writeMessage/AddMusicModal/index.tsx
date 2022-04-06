import React, { useEffect, useState } from "react";
import * as S from "./styles";

import Cancel from "@I/icons/modal/cancel.svg";

function AddMusicModal({ setIsModalOpen, setAudioFile, setAudio }: any) {
  const [audioFileLocally, setAudioFileLocally] = useState<any>(!null);
  const [audioLocally, setAudioLocally] = useState<any>("");

  //0: Before Upload
  //1: Uploading
  //2: Upload Completed
  const [uploadState, setUploadState] = useState(0);

  const onMusicChange = (e: any) => {
    setUploadState(1);
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setAudioFileLocally(e.target.files[0]);

      reader.addEventListener("load", () => {
        setAudioLocally(reader.result);
        setUploadState(2);
      });
    }
  };

  useEffect(() => {
    if (uploadState === 2) {
      setTimeout(() => {
        setIsModalOpen(false);

        setAudioFile(audioFileLocally);
        setAudio(audioLocally);
      }, 1000);
    }
  }, [uploadState, audioFileLocally, audioLocally]);

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
              <S.Title>추가할 음악을 선택하세요</S.Title>
              <S.MusicBox>
                <S.MusicInput onChange={onMusicChange} />
                <S.GuideText>+ 음악 추가하기</S.GuideText>
              </S.MusicBox>
            </>
          )}
          {uploadState === 1 && <S.Title>업로드중...</S.Title>}
          {uploadState === 2 && <S.Title>업로드 완료!</S.Title>}
        </S.Container>
      </S.Box>
    </>
  );
}
export default AddMusicModal;
