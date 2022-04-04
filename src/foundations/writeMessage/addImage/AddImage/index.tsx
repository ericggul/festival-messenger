import React, { useState, useCallback, useEffect, useRef } from "react";
import * as S from "./styles";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview } from "@F/writeMessage/addImage/cropImage/imgPreview";

//hooks
import useResize from "@U/hooks/useResize";

//components
import BeforeInputImage from "@F/writeMessage/addImage/BeforeInputImage";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";
import ResizeIcon from "@I/icons/writeMessage/imageEdit/resize.svg";
import DeleteIcon from "@I/icons/writeMessage/imageEdit/delete.svg";
import CompleteIcon from "@I/icons/writeMessage/imageEdit/complete.svg";
import UndoIcon from "@I/icons/writeMessage/imageEdit/undo.svg";
import LaBoum from "@I/message_test/laboum.png";

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
        setImgDim({
          width: (windowHeight * 0.4) / ratio,
          height: windowHeight * 0.4,
        });
      } else {
        setImgDim({
          width: windowWidth,
          height: windowWidth * ratio,
        });
      }

      let standard = Math.max((windowWidth * ratio) / (windowHeight * 0.4), 1);
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
