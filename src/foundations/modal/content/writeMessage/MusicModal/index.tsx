import React, { useEffect, useState } from "react";
import * as S from "./styles";

//use Modal
import { useAddMusicModal } from "@U/hooks/useModal";
import AddMusicModal from "@F/modal/content/writeMessage/AddMusicModal";

//audio assets
import AUDIO_LIST from "@S/assets/audio/audioList";

function MusicModal({ initialMusic, onMusicClick }: any) {
  const [music, setMusic] = useState(initialMusic);

  const handleClick = (e: any, selectedMusic: any, selectedIdx: any) => {
    e.stopPropagation();
    setMusic(selectedMusic.file);
    if (selectedMusic.file != null) {
      onMusicClick(selectedMusic.file, selectedIdx);
    } else {
      onMusicClick(selectedMusic.file, null);
    }
  };

  //Add Music Modal
  const { modalComponent, setIsModalOpen, audioFile, audio } = useAddMusicModal(AddMusicModal, true, {});
  const [customAudioAddMode, setCustomAudioAddMode] = useState(false);

  useEffect(() => {
    if (audioFile && typeof audioFile === "object") {
      setMusic(audio);
      setCustomAudioAddMode(true);
      onMusicClick(audio, audioFile);
    }
  }, [audioFile, audio]);

  return (
    <>
      <S.Container>
        <S.InnerContainer>
          {AUDIO_LIST.map((audioEl: any, i: number) => (
            <S.AudioElement selected={audioEl.file === music} onClick={(e) => handleClick(e, audioEl, i)} key={i}>
              {audioEl.file ? `${audioEl.name}.mp3` : "No Music"}
            </S.AudioElement>
          ))}
          <S.CustomAudio
            onClick={(e) => {
              e.stopPropagation();
              setCustomAudioAddMode(false);
              setIsModalOpen(true);
            }}
            selected={customAudioAddMode && music === audio}
          >
            {customAudioAddMode ? (
              <div>{audioFile.name}</div>
            ) : (
              <>
                <div>+</div>
                <div>직접 추가하기</div>
              </>
            )}
          </S.CustomAudio>
        </S.InnerContainer>
      </S.Container>
      {modalComponent}
    </>
  );
}
export default MusicModal;
