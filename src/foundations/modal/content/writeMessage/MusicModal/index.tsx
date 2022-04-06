import React, { useEffect, useState } from "react";
import * as S from "./styles";

//use Modal
import { useAddMusicModal } from "@U/hooks/useModal";
import AddMusicModal from "@F/modal/content/writeMessage/AddMusicModal";

const Reality = require("../../../../../static/assets/audio/Reality.mp3");
const BlueDanube = require("../../../../../static/assets/audio/BlueDanube.mp3");

const AUDIO_LIST = [
  {
    name: "No Music",
    file: null,
  },
  {
    name: "Reality",
    file: Reality,
  },
  {
    name: "Blue Danube",
    file: BlueDanube,
  },
  {
    name: "Reality",
    file: Reality,
  },
  {
    name: "Blue Danube",
    file: BlueDanube,
  },
];

function MusicModal({ initialMusic, onMusicClick }: any) {
  const [music, setMusic] = useState(initialMusic);

  const handleClick = (e: any, selectedMusic: any) => {
    e.stopPropagation();
    setMusic(selectedMusic.file);
    if (selectedMusic.file != null) {
      let reader = new FileReader();
      let musicFile = new File([selectedMusic.file], `${selectedMusic.name}.mp3`, {
        type: "audio/mp3",
      });
      console.log(musicFile);
      onMusicClick(selectedMusic.file, musicFile);
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
            <S.AudioElement selected={audioEl.file === music} onClick={(e) => handleClick(e, audioEl)} key={i}>
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
