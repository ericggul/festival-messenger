import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";

//components
import BeforeInputImage from "@F/writeMessage/addImage/BeforeInputImage";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";
import ResizeIcon from "@I/icons/writeMessage/imageEdit/resize.svg";
import CompleteIcon from "@I/icons/writeMessage/imageEdit/complete.svg";
import LaBoum from "@I/message_test/laboum.png";

const ImageEditPanel = ({ onChange, onComplete }: any) => {
  const [semiModalOpen, setSemiModalOpen] = useState("");

  const eventHandler = useCallback(
    (ev: any, commandText: any) => {
      ev.stopPropagation();
      if (commandText === semiModalOpen) {
        setSemiModalOpen("");
      } else {
        setSemiModalOpen(commandText);
      }
    },
    [semiModalOpen]
  );

  return (
    <S.ImageEditContainer>
      <S.Setting onClick={(ev: any) => eventHandler(ev, "resize")}>
        <S.Icon src={ResizeIcon} />
        <S.Text>Resize</S.Text>
      </S.Setting>

      <S.Setting onClick={onChange}>
        <S.Icon src={ChangeIcon} />
        <S.Text>Change</S.Text>
      </S.Setting>

      <S.Setting onClick={onComplete}>
        <S.Icon src={CompleteIcon} />
        <S.Text>Complete</S.Text>
      </S.Setting>
    </S.ImageEditContainer>
  );
};

function AddImage({ deleteAddImageContainer }: any) {
  const [imageFile, setImageFile] = useState<any>(!null);
  const [image, setImage] = useState<any>("");

  const onImageChange = (e: any) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);

      reader.addEventListener("load", () => {
        console.log(reader.result);
        setImage(reader.result);
      });
    }
  };

  //Image Edit Panel show
  const [showImageEditPanel, setShowImageEditPanel] = useState(false);
  useEffect(() => {
    if (image !== "") {
      setShowImageEditPanel(true);
    } else if(image === ""){
      setShowImageEditPanel(false);
    }
  }, [image]);

  return (
    <S.FatherContainer>
      <S.Container showBorder={image === ""}>
        {image === "" ? <BeforeInputImage onImageChange={onImageChange} deleteAddImageContainer={deleteAddImageContainer} /> : <S.Image src={image} />}
      </S.Container>
      {showImageEditPanel && <ImageEditPanel onChange={() => setImage("")} onComplete={() => setShowImageEditPanel(false)} />}
    </S.FatherContainer>
  );
}
export default AddImage;
