import React, { useEffect, useState } from "react";
import * as S from "./styles";

//Functions
import getDistance from "@U/functions/distance";

function OpenMessageModalContents({ message, pos }: any) {
  const [messageAvailable, setMessageAvailable] = useState(false);

  console.log(pos, message.latLngPos);
  useEffect(() => {
    const distance = getDistance(message.latLngPos, pos);
    setMessageAvailable(distance < 50 ? true : false);
  }, [message.latLngPos, pos]);

  return <S.Container>OpenMessageModalContents</S.Container>;
}
export default OpenMessageModalContents;
