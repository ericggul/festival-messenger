import React, { useState } from "react";
import * as S from "./styles";
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

  return (
    <S.Container>
      <S.InnerContainer>
        {AUDIO_LIST.map((audio: any, i: number) => (
          <S.AudioElement selected={audio === music} onClick={(e) => handleClick(e, audio)} key={i}>
            {audio.file ? `${audio.name}.mp3` : "No Music"}
          </S.AudioElement>
        ))}
        <S.CustomAudio>+ 직접 추가하기</S.CustomAudio>
      </S.InnerContainer>
    </S.Container>
  );
}
export default MusicModal;
