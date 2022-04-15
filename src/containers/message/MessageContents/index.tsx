import React, { useMemo, useState, useEffect } from "react";
import * as S from "./styles";

//foundations
import MessageBackground from "@F/background/MessageBackground";

//hooks
import useResize from "@U/hooks/useResize";

function MessageContents({ toName, mainText, color, font, image, music }: any) {
  const isTextBlack = useMemo(() => color?.black || false, [color]);

  //Image Dimensions
  const [windowWidth, windowHeight] = useResize();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imgDim, setImgDim] = useState({ width: windowWidth, height: 0 });

  //Read Image Size
  useEffect(() => {
    let img: any = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = image;
  }, [image]);

  //Read Image Dimensions
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

  return (
    <S.Container>
      <MessageBackground color={color} audio={music} />
      <S.MessagePanel font={font} isTextBlack={isTextBlack}>
        <S.ToText isTextBlack={isTextBlack}>Message To. {toName}</S.ToText>

        {image && (
          <S.ImageContainer width={imgDim.width} height={imgDim.height}>
            <S.Image src={image} />
          </S.ImageContainer>
        )}

        <S.MainText isTextBlack={isTextBlack}>
          {mainText.split("\n").map((e: any, i: number) => (
            <React.Fragment key={i}>
              {e}
              <br />
            </React.Fragment>
          ))}
        </S.MainText>
      </S.MessagePanel>
    </S.Container>
  );
}
export default MessageContents;
