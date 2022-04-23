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
import ImageIcon from "@I/icons/writeMessage/image-1.svg";
import Up from "@I/icons/writeMessage/up.svg";
import Down from "@I/icons/writeMessage/down.svg";

function Utils({ onColorChange, onMusicChange, onFontChange, displayAddImageOption, onAddImageCommand }: any) {
  const navigate = useNavigate();

  const [showUtils, setShowUtils] = useState(true);
  const [semiModalOpen, setSemiModalOpen] = useState("");

  useEffect(() => {
    if (!showUtils) {
      setSemiModalOpen("");
    }
  }, [showUtils]);

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

  //Intermediate state listener for color, etc.
  const [music, setMusic] = useState({
    name: "No Music",
    file: null,
  });
  const [font, setFont] = useState("Seoul Namsan");

  const onColorClick = (cl: any) => {
    onColorChange(cl);
  };
  const onMusicClick = (mz: any, mzFile: any) => {
    setMusic(mz);
    onMusicChange(mz, mzFile);
  };
  const onFontClick = (ft: any) => {
    setFont(ft);
    onFontChange(ft);
  };

  return (
    <S.UtilContainer showUtils={showUtils}>
      <S.Utils
        onClick={() => {
          setSemiModalOpen("");
        }}
      >
        <S.Back onClick={() => navigate(-1)}>
          <S.Icon src={BackIcon} highlight={false} />
          <S.Text>Back</S.Text>
        </S.Back>
        <S.Settings>
          <S.Setting onClick={(ev: any) => eventHandler(ev, "color")}>
            <S.SettingSets>
              <S.Icon src={ColorIcon} highlight={semiModalOpen === "color"} />
              <S.Text>Color</S.Text>
            </S.SettingSets>

            {semiModalOpen === "color" && <ColorModal initialColor={font} onColorClick={onColorClick} />}
          </S.Setting>
          <S.Setting onClick={(ev: any) => eventHandler(ev, "music")}>
            <S.SettingSets>
              <S.Icon src={MusicIcon} highlight={semiModalOpen === "music"} />
              <S.Text>Music</S.Text>
            </S.SettingSets>

            {semiModalOpen === "music" && <MusicModal initialMusic={music} onMusicClick={onMusicClick} />}
          </S.Setting>
          <S.Setting onClick={(ev: any) => eventHandler(ev, "font")}>
            <S.SettingSets>
              <S.Icon src={FontIcon} highlight={semiModalOpen === "font"} />
              <S.Text>{semiModalOpen === "font" ? "집토스" : "Font"}</S.Text>
            </S.SettingSets>

            {semiModalOpen === "font" && <FontModal initialFont={font} onFontClick={onFontClick} />}
          </S.Setting>

          {displayAddImageOption && (
            <S.Setting onClick={onAddImageCommand}>
              <S.SettingSets>
                <S.Icon src={ImageIcon} highlight={false} />
                <S.Text>Image</S.Text>
              </S.SettingSets>
            </S.Setting>
          )}
        </S.Settings>
      </S.Utils>
      <S.UtilsToggler draggable={false} onClick={() => setShowUtils((bol) => !bol)}>
        <S.GhostDragger
          draggable={true}
          onDragStart={(ev: any) => {
            ev.preventDefault();
            //Set time out setted to prevent unexpected consecutive behavior
            setTimeout(() => {
              setShowUtils((bol) => !bol);
            }, 100);
          }}
        />
        <S.Icon src={showUtils ? Up : Down} highlight={false} />
      </S.UtilsToggler>
    </S.UtilContainer>
  );
}
export default Utils;
