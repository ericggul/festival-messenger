import React from "react";
import * as S from "./styles";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";
import ResizeIcon from "@I/icons/writeMessage/imageEdit/resize.svg";
import DeleteIcon from "@I/icons/writeMessage/imageEdit/delete.svg";
import CompleteIcon from "@I/icons/writeMessage/imageEdit/complete.svg";
import UndoIcon from "@I/icons/writeMessage/imageEdit/undo.svg";

import ChangeWhite from "@I/icons/writeMessage/imageEdit/change-white.svg";
import ResizeWhite from "@I/icons/writeMessage/imageEdit/resize-white.svg";
import DeleteWhite from "@I/icons/writeMessage/imageEdit/delete-white.svg";
import CompleteWhite from "@I/icons/writeMessage/imageEdit/complete-white.svg";
import UndoWhite from "@I/icons/writeMessage/imageEdit/undo-white.svg";

const ImageEditPanel = ({
  onResize,
  onChange,
  onDelete,
  onComplete,
  resizing,

  resizeReset,
  resizeComplete,
  colorBlack,
}: any) => {
  return (
    <>
      {resizing ? (
        <S.ImageEditContainer colorBlack={colorBlack}>
          <S.Setting onClick={resizeReset}>
            <S.Icon src={colorBlack ? UndoIcon : UndoWhite} />
            <S.Text>초기화 </S.Text>
          </S.Setting>

          <S.Setting onClick={resizeComplete}>
            <S.Icon src={colorBlack ? CompleteIcon : CompleteWhite} />
            <S.Text bold={true}>리사이즈 완료</S.Text>
          </S.Setting>
        </S.ImageEditContainer>
      ) : (
        <S.ImageEditContainer colorBlack={colorBlack}>
          <S.Setting onClick={onResize}>
            <S.Icon src={colorBlack ? ResizeIcon : ResizeWhite} />
            <S.Text>사진 자르기</S.Text>
          </S.Setting>

          <S.Setting onClick={onChange}>
            <S.Icon src={colorBlack ? ChangeIcon : ChangeWhite} />
            <S.Text>사진 변경</S.Text>
          </S.Setting>

          <S.Setting onClick={onDelete}>
            <S.Icon src={colorBlack ? DeleteIcon : DeleteWhite} />
            <S.Text>사진 제거</S.Text>
          </S.Setting>

          <S.Setting onClick={onComplete}>
            <S.Icon src={colorBlack ? CompleteIcon : CompleteWhite} />
            <S.Text bold={true}>사진 설정 완료</S.Text>
          </S.Setting>
        </S.ImageEditContainer>
      )}
    </>
  );
};
export default ImageEditPanel;
