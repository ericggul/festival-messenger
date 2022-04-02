import React, { useState, useCallback, useEffect, useRef } from "react";
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

  const eventHandler = useCallback(
    (ev: any, commandText: any) => {
      ev.stopPropagation();
      if (commandText === semiModalOpen) {
        setSemiModalOpen("");
      } else {
        setSemiModalOpen(commandText);
      }
    },
    [semiModalOpen]
  );

  return (
    <S.Utils
      onClick={() => {
        console.log("ev!");
        setSemiModalOpen("");
      }}
    >
      <S.Back onClick={() => navigate("/map")}>
        <S.Icon src={BackIcon} highlight={false} />
        <S.Text>Back</S.Text>
      </S.Back>
      <S.Settings>
        <S.Setting onClick={(ev: any) => eventHandler(ev, "color")}>
          <S.Icon src={ColorIcon} highlight={semiModalOpen === "color"} />
          <S.Text>Color</S.Text>
          {semiModalOpen === "color" && <ColorModal />}
        </S.Setting>
        <S.Setting onClick={(ev: any) => eventHandler(ev, "music")}>
          <S.Icon src={MusicIcon} highlight={semiModalOpen === "music"} />
          <S.Text>Music</S.Text>
          {semiModalOpen === "music" && <MusicModal />}
        </S.Setting>
        <S.Setting onClick={(ev: any) => eventHandler(ev, "font")}>
          <S.Icon src={FontIcon} highlight={semiModalOpen === "font"} />
          <S.Text>Font</S.Text>
          {semiModalOpen === "font" && <FontModal />}
        </S.Setting>
      </S.Settings>
    </S.Utils>
  );
}
export default Utils;
