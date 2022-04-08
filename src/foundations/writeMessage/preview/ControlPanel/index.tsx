import React from "react";
import * as S from "./styles";

//Icons
import EditIcon from "@I/icons/writeMessage/previewControl/edit-1.svg";
import SendIcon from "@I/icons/writeMessage/previewControl/send-2.svg";

function ControlPanel({ handleEdit, handleSend }: any) {
  return (
    <S.ControlPanel>
      <S.Button onClick={handleEdit}>
        <S.Img src={EditIcon} />
        <S.Text>수정하기</S.Text>
      </S.Button>
      <S.Button onClick={handleSend}>
        <S.Img src={SendIcon} />
        <S.Text>전송하기</S.Text>
      </S.Button>
    </S.ControlPanel>
  );
}
export default ControlPanel;
