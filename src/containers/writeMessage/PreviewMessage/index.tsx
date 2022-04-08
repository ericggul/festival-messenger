import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import * as CS from "@C/writeMessage/common/styles";

import { useNavigate } from "react-router-dom";

//speak
import speak from "@U/functions/speak";

//foundations
import MessageBackground from "@F/background/MessageBackground";
import ControlPanel from "@F/writeMessage/preview/ControlPanel";
import LoadingModal from "@F/modal/content/LoadingModal";

//function
import handleSend from "./handleSend";

//hooks
import useModal from "@U/hooks/useModal";
import useResize from "@U/hooks/useResize";

//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//audio assets
import AUDIO_LIST from "@S/assets/audio/audioList";

function PreviewMessage({ moveBackToWriteMode, imageFile, musicFile }: any) {
  const preview = useAppSelector((state) => state.singleMessagePreview);
  const user = useAppSelector((state) => state.users);

  const [image, setImage] = useState<any>(null);
  const [music, setMusic] = useState<any>(null);
  const isTextBlack = useMemo(() => preview.color?.black || false, [preview.color]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", () => {
        setImage(reader.result);

        let img: any = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = reader.result;
      });
    }

    if (musicFile) {
      if (typeof musicFile === "number") {
        setMusic(AUDIO_LIST[musicFile].file);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(musicFile);

        reader.addEventListener("load", () => {
          setMusic(reader.result);
        });
      }
    }
  }, [imageFile, musicFile]);

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

  function handleEdit() {
    moveBackToWriteMode();
  }

  const { modalComponent, isModalOpen, setIsModalOpen } = useModal(LoadingModal);

  const dispatch = useAppDispatch();

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
              <div key={i}>{e} </div>
            ))}
          </CS.MainText>
        </CS.MessagePanel>
      </CS.Container>
      <ControlPanel handleEdit={handleEdit} handleSend={() => handleSend(preview, imageFile, musicFile, dispatch, user, setIsModalOpen)} />
      {modalComponent}
    </>
  );
}
export default PreviewMessage;
