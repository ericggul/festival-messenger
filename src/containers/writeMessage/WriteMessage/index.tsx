import React, { useEffect } from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//icons
import BackIcon from "@I/icons/writeMessage/back.svg";
import FontIcon from "@I/icons/writeMessage/font.svg";
import ColorIcon from "@I/icons/writeMessage/color.svg";
import MusicIcon from "@I/icons/writeMessage/music.svg";

function WriteMessage(props: any) {
  console.log(props?.id, props?.latLng);
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Utils>
        <S.Back onClick={() => navigate("/map")}>
          <S.Icon src={BackIcon} />
          <S.Text>Back</S.Text>
        </S.Back>
        <S.Settings>
          <S.Setting>
            <S.Icon src={FontIcon} />
            <S.Text>Color</S.Text>
          </S.Setting>
          <S.Setting>
            <S.Icon src={ColorIcon} />
            <S.Text>Music</S.Text>
          </S.Setting>
          <S.Setting>
            <S.Icon src={MusicIcon} />
            <S.Text>Font</S.Text>
          </S.Setting>
        </S.Settings>
      </S.Utils>
    </S.Container>
  );
}
export default WriteMessage;
