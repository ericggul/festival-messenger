import React, { useEffect, useState } from "react";

//containers
import MessageContents from "@C/message/MessageContents";

//foundations
import ControlPanel from "@F/writeMessage/preview/ControlPanel";
import LoadingModal from "@F/modal/content/LoadingModal";

//function
import handleSend from "./handleSend";

//hooks
import useModal from "@U/hooks/useModal";

//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//audio assets
import AUDIO_LIST from "@S/assets/audio/audioList";

//speak
import speak from "@U/functions/speak";

function PreviewMessage({ moveBackToWriteMode, imageFile, musicFile }: any) {
  const preview = useAppSelector((state) => state.singleMessagePreview);
  const user = useAppSelector((state) => state.users);

  const [image, setImage] = useState<any>(null);
  const [music, setMusic] = useState<any>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", () => {
        setImage(reader.result);
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

  function handleEdit() {
    moveBackToWriteMode();
  }

  const { modalComponent, isModalOpen, setIsModalOpen } = useModal(LoadingModal);

  const dispatch = useAppDispatch();

  return (
    <>
      <MessageContents toName={preview.toName} mainText={preview.mainText} color={preview.color} font={preview.font} image={image} music={music} />
      <ControlPanel handleEdit={handleEdit} handleSend={() => handleSend(preview, imageFile, musicFile, dispatch, user, setIsModalOpen)} />
      {modalComponent}
    </>
  );
}
export default PreviewMessage;
