import React, { useState } from "react";
import * as S from "./styles";

//use Modal
import useModal from "@U/hooks/useModal";
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
    setMusic(selectedMusic);
    onMusicClick(selectedMusic);
  };

  //Add Music Modal
  const { modalComponent, isModalOpen, setIsModalOpen } = useModal(AddMusicModal, true, {}, () => {
    console.log("hey");
  });

  return (
    <>
      <S.Container>
        <S.InnerContainer>
          {AUDIO_LIST.map((audio: any, i: number) => (
            <S.AudioElement selected={audio === music} onClick={(e) => handleClick(e, audio)} key={i}>
              {audio.file ? `${audio.name}.mp3` : "No Music"}
            </S.AudioElement>
          ))}
          <S.CustomAudio
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <div>+</div>
            <div>직접 추가하기</div>
          </S.CustomAudio>
        </S.InnerContainer>
      </S.Container>
      {modalComponent}
    </>
  );
}
export default MusicModal;
