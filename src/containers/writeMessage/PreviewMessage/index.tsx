import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import * as CS from "@C/writeMessage/common/styles";

import { useNavigate } from "react-router-dom";

//speak
import speak from "@U/functions/speak";

//foundations
import MessageBackground from "@F/background/MessageBackground";

//hooks
import useResize from "@U/hooks/useResize";

//redux
import { useAppSelector } from "@R/common/hooks";

//Icons
import EditIcon from "@I/icons/writeMessage/previewControl/edit-1.svg";
import SendIcon from "@I/icons/writeMessage/previewControl/send-2.svg";

function PreviewMessage({ moveBackToWriteMode }: any) {
  const preview = useAppSelector((state) => state.singleMessagePreview);

  console.log(typeof preview.musicFile);
  const [image, setImage] = useState<any>(null);
  const [music, setMusic] = useState<any>(null);
  const isTextBlack = useMemo(() => preview.color?.black || false, [preview.color]);

  useEffect(() => {
    speak("배우진 닥쳐!");
    if (preview.imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(preview.imageFile);
      reader.addEventListener("load", () => {
        setImage(reader.result);

        let img: any = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = reader.result;
      });
    }

    if (preview.musicFile) {
      const reader = new FileReader();
      reader.readAsDataURL(preview.musicFile);

      reader.addEventListener("load", () => {
        setMusic(reader.result);
      });
    }
  }, [preview.imageFile, preview.musicFile]);

  //Image Dimensions
  const [windowWidth, windowHeight] = useResize();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imgDim, setImgDim] = useState({ width: windowWidth, height: 0 });

  //auto-set container of img size change
  useEffect(() => {
    if (imageSize.width !== 0 && imageSize.height !== 0) {
      let ratio = imageSize.height / imageSize.width;
      if (windowWidth * ratio > windowHeight * 0.4) {
        let standardWidth = Math.min(windowHeight, windowWidth) * 0.8;
        if ((windowHeight * 0.4) / ratio < standardWidth * 1.2 && (windowHeight * 0.4) / ratio > standardWidth * 0.8) {
          setImgDim({
            width: standardWidth,
            height: standardWidth * ratio,
          });
        } else {
          setImgDim({
            width: (windowHeight * 0.4) / ratio,
            height: windowHeight * 0.4,
          });
        }
      } else {
        setImgDim({
          width: windowWidth,
          height: windowWidth * ratio,
        });
      }
    }
  }, [imageSize, windowWidth, windowHeight]);

  console.log(image, music);

  function handleEdit() {
    console.log("hey");
    moveBackToWriteMode();
  }

  return (
    <>
      <CS.Container>
        <MessageBackground color={preview.color} audio={music} />
        <CS.MessagePanel font={preview.font} isTextBlack={isTextBlack}>
          <CS.ToText isTextBlack={isTextBlack}>Message To. {preview.toName}</CS.ToText>

          {image && (
            <CS.ImageContainer width={imgDim.width} height={imgDim.height}>
              <CS.Image src={image} />
            </CS.ImageContainer>
          )}

          <CS.MainText isTextBlack={isTextBlack}>
            {preview.mainText.split("\n").map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </CS.MainText>
        </CS.MessagePanel>
      </CS.Container>
      <S.ControlPanel>
        <S.Button onClick={handleEdit}>
          <S.Img src={EditIcon} />
          <S.Text>수정하기</S.Text>
        </S.Button>
        <S.Button>
          <S.Img src={SendIcon} />
          <S.Text>전송하기</S.Text>
        </S.Button>
      </S.ControlPanel>
    </>
  );
}
export default PreviewMessage;
