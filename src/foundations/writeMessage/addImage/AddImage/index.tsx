import React, { useState, useCallback, useEffect, useRef } from "react";
import * as S from "./styles";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview } from "@/foundations/writeMessage/addImage/ImageEditPanel/cropImage/imgPreview";

//hooks
import useResize from "@U/hooks/useResize";

//components
import BeforeInputImage from "@F/writeMessage/addImage/BeforeInputImage";
import ImageEditPanel from "@F/writeMessage/addImage/ImageEditPanel";

function AddImage({ deleteAddImageContainer, getImageState, onImageRespond }: any) {
  //Initial Image to save for reset
  const [initialImageFile, setInitialImageFile] = useState<any>(!null);
  const [initialImage, setInitialImage] = useState<any>("");

  const [imageFile, setImageFile] = useState<any>(!null);
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    if (getImageState) {
      onImageRespond(imageFile);
    }
  }, [getImageState]);

  //Dimensions
  const [windowWidth, windowHeight] = useResize();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imgDim, setImgDim] = useState({ width: windowWidth, height: 0 });

  const onImageChange = (e: any) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setInitialImageFile(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        setInitialImage(reader.result);
        setImage(reader.result);

        let img: any = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = reader.result;
      });
    }
  };

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

  //Image Edit Panel show
  const [showImageEditPanel, setShowImageEditPanel] = useState(false);
  useEffect(() => {
    if (image !== "") {
      setShowImageEditPanel(true);
    } else if (image === "") {
      setShowImageEditPanel(false);
    }
  }, [image]);

  //Resize Option
  const imgRef = useRef<any>(!null);
  const [resizeModeOn, setResizeModeOn] = useState(false);
  const [crop, setCrop] = useState<any>(!null);

  async function onResizeComplete() {
    let { previewUrl } = await imgPreview(imgRef.current, crop);
    const file = new File([previewUrl], "new_cropped.png");
    setImageFile(file);
    setImage(previewUrl);
    setResizeModeOn(false);
  }

  return (
    <>
      {image === "" ? (
        <BeforeInputImage onImageChange={onImageChange} deleteAddImageContainer={deleteAddImageContainer} />
      ) : (
        <S.FatherContainer>
          <S.ImageContainer width={imgDim.width} height={imgDim.height}>
            {resizeModeOn ? (
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                <S.Image ref={imgRef} src={image} />
              </ReactCrop>
            ) : (
              <S.Image src={image} onClick={() => !showImageEditPanel && setShowImageEditPanel(true)} />
            )}
          </S.ImageContainer>

          {showImageEditPanel && (
            <ImageEditPanel
              onResize={() => setResizeModeOn(true)}
              onChange={() => setImage("")}
              onDelete={deleteAddImageContainer}
              onComplete={() => setShowImageEditPanel(false)}
              //Resize Mode Inner options
              resizing={resizeModeOn}
              resizeReset={() => {
                setImage(initialImage);
                setImageFile(initialImageFile);
                setCrop(null);
                setResizeModeOn(false);
              }}
              resizeComplete={onResizeComplete}
            />
          )}
        </S.FatherContainer>
      )}
    </>
  );
}
export default AddImage;
