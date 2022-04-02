import React from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//modals
import useModal from "@U/hooks/useModal";
import ColorModal from "@F/modal/content/writeMessage/ColorModal";
import MusicModal from "@F/modal/content/writeMessage/MusicModal";
import FontModal from "@F/modal/content/writeMessage/FontModal";

//icons
import BackIcon from "@I/icons/writeMessage/back.svg";
import FontIcon from "@I/icons/writeMessage/font.svg";
import ColorIcon from "@I/icons/writeMessage/color.svg";
import MusicIcon from "@I/icons/writeMessage/music.svg";

function Utils({ onColorChange, onMusicChange, onFontChange }: any) {
  const navigate = useNavigate();

  const { modalComponent: colorModal, isModalOpen: isColorModalOpen, setIsModalOpen: setIsColorModalOpen } = useModal(ColorModal, true, {}, () => console.log("color modal closed"));
  const { modalComponent: musicModal, isModalOpen: isMusicModalOpen, setIsModalOpen: setIsMusicModalOpen } = useModal(MusicModal, true, {}, () => console.log("color modal closed"));
  const { modalComponent: fontModal, isModalOpen: isFontModalOpen, setIsModalOpen: setIsFontModalOpen } = useModal(FontModal, true, {}, () => console.log("color modal closed"));

  return (
    <S.Utils>
      <S.Back onClick={() => navigate("/map")}>
        <S.Icon src={BackIcon} />
        <S.Text>Back</S.Text>
      </S.Back>
      <S.Settings>
        <S.Setting onClick={() => setIsColorModalOpen((st) => !st)}>
          <S.Icon src={ColorIcon} />
          <S.Text>Color</S.Text>
          {colorModal}
        </S.Setting>
        <S.Setting onClick={() => setIsMusicModalOpen((st) => !st)}>
          <S.Icon src={MusicIcon} />
          <S.Text>Music</S.Text>
          {musicModal}
        </S.Setting>
        <S.Setting onClick={() => setIsFontModalOpen((st) => !st)}>
          <S.Icon src={FontIcon} />
          <S.Text>Font</S.Text>
          {fontModal}
        </S.Setting>
      </S.Settings>
    </S.Utils>
  );
}
export default Utils;
