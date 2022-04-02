import React, { useState, useCallback } from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//modals
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

  const [semiModalOpen, setSemiModalOpen] = useState("");

  const modalToggler = useCallback((commandText: any) => {
    if (commandText === semiModalOpen) {
      setSemiModalOpen("");
    } else {
      setSemiModalOpen(commandText);
    }
  }, []);

  return (
    <S.Utils>
      <S.Back onClick={() => navigate("/map")}>
        <S.Icon src={BackIcon} />
        <S.Text>Back</S.Text>
      </S.Back>
      <S.Settings>
        <S.Setting onClick={() => modalToggler("color")}>
          <S.Icon src={ColorIcon} />
          <S.Text>Color</S.Text>
          {semiModalOpen === "color" && <ColorModal />}
        </S.Setting>
        <S.Setting onClick={() => modalToggler("music")}>
          <S.Icon src={MusicIcon} />
          <S.Text>Music</S.Text>
          {semiModalOpen === "music" && <MusicModal />}
        </S.Setting>
        <S.Setting onClick={() => modalToggler("font")}>
          <S.Icon src={FontIcon} />
          <S.Text>Font</S.Text>
          {semiModalOpen === "font" && <FontModal />}
        </S.Setting>
      </S.Settings>
    </S.Utils>
  );
}
export default Utils;
