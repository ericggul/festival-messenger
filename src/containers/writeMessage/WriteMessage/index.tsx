import React, { useEffect, useState } from "react";
import * as S from "./styles";

import { useNavigate } from "react-router-dom";

//Foundations
import Utils from "@F/writeMessage/Utils";
import MessageBackground from "@F/background/MessageBackground";

const Reality = require("../../../static/assets/audio/Reality.mp3");

function WriteMessage(props: any) {
  console.log(props?.id, props?.latLng);
  const navigate = useNavigate();

  const [color, setColor] = useState({ h: 144, s: 17, l: 42 });
  const [music, setMusic] = useState(Reality);
  const [font, setFont] = useState(null);

  return (
    <S.Container>
      <Utils onColorChange={(cl: any) => setColor(cl)} onMusicChange={(mz: any) => setMusic(mz)} onFontChange={(ft: any) => setFont(ft)} />
      <MessageBackground color={color} audio={null} />
    </S.Container>
  );
}
export default WriteMessage;
