import React from "react";
import * as S from "./styles";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";
import ResizeIcon from "@I/icons/writeMessage/imageEdit/resize.svg";
import DeleteIcon from "@I/icons/writeMessage/imageEdit/delete.svg";
import CompleteIcon from "@I/icons/writeMessage/imageEdit/complete.svg";
import UndoIcon from "@I/icons/writeMessage/imageEdit/undo.svg";

const ImageEditPanel = ({
  onResize,
  onChange,
  onDelete,
  onComplete,
  resizing,

  resizeReset,
  resizeComplete,
}: any) => {
  return (
    <>
      {resizing ? (
        <S.ImageEditContainer>
          <S.Setting onClick={resizeReset}>
            <S.Icon src={UndoIcon} />
            <S.Text>초기화 </S.Text>
          </S.Setting>

          <S.Setting onClick={resizeComplete}>
            <S.Icon src={CompleteIcon} />
            <S.Text bold={true}>리사이즈 완료</S.Text>
          </S.Setting>
        </S.ImageEditContainer>
      ) : (
        <S.ImageEditContainer>
          <S.Setting onClick={onResize}>
            <S.Icon src={ResizeIcon} />
            <S.Text>사진 자르기</S.Text>
          </S.Setting>

          <S.Setting onClick={onChange}>
            <S.Icon src={ChangeIcon} />
            <S.Text>사진 변경</S.Text>
          </S.Setting>

          <S.Setting onClick={onDelete}>
            <S.Icon src={DeleteIcon} />
            <S.Text>사진 제거</S.Text>
          </S.Setting>

          <S.Setting onClick={onComplete}>
            <S.Icon src={CompleteIcon} />
            <S.Text bold={true}>사진 설정 완료</S.Text>
          </S.Setting>
        </S.ImageEditContainer>
      )}
    </>
  );
};
export default ImageEditPanel;
