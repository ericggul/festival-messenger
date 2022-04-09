import React, { useEffect, useState } from "react";

//react router usenavigate
import { useNavigate } from "react-router-dom";

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
import { actions } from "@R/singleMessage/messagePreview/state";

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

  const [messageSendStarted, setMessageSendStarted] = useState(false);
  const [messageSendFinished, setMessageSendFinished] = useState(false);
  const navigate = useNavigate();
  const { modalComponent, isModalOpen, setIsModalOpen } = useModal(LoadingModal, true, {}, () => {
    console.log("66");
    if (messageSendStarted) {
      console.log("69");
      setMessageSendFinished(true);
      dispatch(actions.reset());
      navigate("/map");
    }
  });

  const dispatch = useAppDispatch();

  return (
    <>
      {messageSendFinished ? <></> : <MessageContents toName={preview.toName} mainText={preview.mainText} color={preview.color} font={preview.font} image={image} music={music} />}

      <ControlPanel
        handleEdit={handleEdit}
        handleSend={() => {
          setMessageSendStarted(true);
          handleSend(preview, imageFile, musicFile, dispatch, user, setIsModalOpen);
        }}
      />
      {modalComponent}
    </>
  );
}
export default PreviewMessage;
