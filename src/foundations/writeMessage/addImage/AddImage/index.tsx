import React, { useState } from "react";
import * as S from "./styles";

import LaBoum from "@I/message_test/laboum.png";

function AddImage({ deleteAddImage }: any) {
  const [image, setImage] = useState(LaBoum);

  return (
    <S.Container>
      <S.ImageInput />
      <S.GuideText>+ 이미지 추가하기</S.GuideText>
      <S.DeleteBox onClick={deleteAddImage}>
        <S.DeleteRect />
      </S.DeleteBox>
    </S.Container>
  );
}
export default AddImage;
