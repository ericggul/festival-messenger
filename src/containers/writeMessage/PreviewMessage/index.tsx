import React, { useEffect, useState } from "react";
//styles
import * as ES from "@S/style/common/errorPage";

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
    if (messageSendStarted) {
      setMessageSendFinished(true);
      dispatch(actions.reset());

      window.confirm("친구에게 카카오톡 메시지를 전송하기 위해 팝업을 허용해주세요!");

      shareThroughKakao();
      navigate("/map");
    }
  });

  //share through kakao
  const [chatId, setChatId] = useState<any>(null);
  const [messageId, setMessageId] = useState<any>(null);
  const [profileName, setProfileName] = useState<any>(null);
  const [profileImg, setProfileImg] = useState<any>(null);

  const shareThroughKakao = () => {
    window.Kakao.Link.sendCustom({
      templateId: 74978,
      templateArgs: {
        imageURL: profileImg,
        profileName,
        chatId,
        messageId,
      },
    });
  };

  const dispatch = useAppDispatch();

  console.log("message send finished", messageSendFinished);

  return (
    <>
      {messageSendFinished ? (
        <ES.Container>
          <ES.Text>
            <p>메시지 전송 완료!</p>
            <p>친구한테 카카오톡 메시지를 보내서 메시지 링크를 전송해주세요!</p>
            <p>브라우저 팝업을 허용해야 합니다.</p>
          </ES.Text>
          <ES.ToMainButton onClick={() => navigate("/map")}>지도로 돌아가기</ES.ToMainButton>
        </ES.Container>
      ) : (
        <MessageContents toName={preview.toName} mainText={preview.mainText} color={preview.color} font={preview.font} image={image} music={music} />
      )}

      <ControlPanel
        handleEdit={handleEdit}
        handleSend={() => {
          setMessageSendStarted(true);
          handleSend(preview, imageFile, musicFile, dispatch, user, setIsModalOpen, setChatId, setMessageId, setProfileName, setProfileImg);
        }}
      />
      {modalComponent}
    </>
  );
}
export default PreviewMessage;
