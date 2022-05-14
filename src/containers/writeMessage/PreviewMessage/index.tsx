import React, { useEffect, useState } from "react";
//styles
import * as ES from "@S/style/common/errorPage";

//kakao config
import { KAKAO_MESSAGE_ID, KAKAO_LINK_ID } from "@/configs/kakao";

//react router usenavigate
import { useNavigate } from "react-router-dom";

//containers
import MessageContents from "@C/message/MessageContents";

//foundations
import ControlPanel from "@F/writeMessage/preview/ControlPanel";
import LoadingModal from "@F/modal/content/LoadingModal";
import ShareViaKakao from "@F/transitoryPages/ShareViaKakao";
import KakaoSending from "@F/transitoryPages/KakaoSending";

//Toast
import toast from "react-hot-toast";

//function
import handleSend from "./handleSend";

//hooks
import useModal from "@U/hooks/useModal";

//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { actions } from "@R/singleMessage/messagePreview/state";

//audio assets
import AUDIO_LIST from "@S/assets/audio/audioList";

//analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

function PreviewMessage({ moveBackToWriteMode, imageFile, musicFile }: any) {
  useEffect(() => {
    toast("메시지 미리보기! 전송하기를 누르면 메시지가 전송됩니다.");
    EventBehavior("Write Message", "Message Preview Phase", "Started to preview message");
  }, []);
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
    EventBehavior("Write Message", "Message Preview Phase", "Back to Message Writing Phase");
    moveBackToWriteMode();
  }

  const [messageSendStarted, setMessageSendStarted] = useState(false);
  const [messageSendFinished, setMessageSendFinished] = useState(false);
  const [kakaoAutomaticallySend, setKakaoAutomaticallySend] = useState(false);

  const [kakaoLinkClicked, setKakaoLinkClicked] = useState(false);
  const navigate = useNavigate();
  const { modalComponent, isModalOpen, setIsModalOpen } = useModal(LoadingModal, true, {}, () => {
    if (messageSendStarted) {
      setMessageSendFinished(true);
      dispatch(actions.reset());
    }
  });

  //share through kakao
  const [chatId, setChatId] = useState<any>(null);
  const [messageId, setMessageId] = useState<any>(null);
  const [messageUUID, setMessageUUID] = useState<any>(null);
  const [profileName, setProfileName] = useState<any>(null);
  const [profileImg, setProfileImg] = useState<any>(null);

  const shareThroughKakao = () => {
    if (messageUUID === "unassigned") {
      //if there is no friend registerd, share through kakao Link
      shareThroughKakaoLink();
    }
  };

  useEffect(() => {
    if (messageSendFinished) {
      if (messageUUID !== "unassigned") {
        setKakaoAutomaticallySend(true);
        shareThroughKakaoMessenger();
      }
    }
  }, [messageSendFinished, messageUUID]);

  const shareThroughKakaoMessenger = async () => {
    await window.Kakao.API.request({
      url: "/v1/api/talk/friends/message/send",
      data: {
        receiver_uuids: [messageUUID],
        template_id: KAKAO_MESSAGE_ID,
        template_args: {
          imageURL: profileImg,
          profileName,
          chatId,
          messageId,
        },
      },
      success: function (response: any) {
        EventBehavior("Write Message", "Message Preview Phase", "Share Through Kakao Messenger");
        navigate("/messenger");
      },
      fail: function (error: any) {
        console.log(error);
        if (error.code) {
          shareThroughKakaoLink();
        }
      },
    });
  };

  const shareThroughKakaoLink = () => {
    EventBehavior("Write Message", "Message Preview Phase", "Share Through Kakao Link");
    toast("친구에게 카카오톡 메시지를 전송하기 위해 팝업을 허용해주세요!");
    window.Kakao.Link.sendCustom({
      templateId: KAKAO_LINK_ID,
      templateArgs: {
        imageURL: profileImg,
        profileName,
        chatId,
        messageId,
      },
    });
    setKakaoLinkClicked(true);
  };

  useEffect(() => {
    if (kakaoLinkClicked) {
      navigate("/messenger");
    }
  }, [kakaoLinkClicked]);

  const dispatch = useAppDispatch();

  return (
    <>
      {messageSendFinished ? (
        kakaoAutomaticallySend ? (
          <KakaoSending />
        ) : (
          <ShareViaKakao onClick={shareThroughKakao} />
        )
      ) : (
        <MessageContents toName={preview.toName} mainText={preview.mainText} color={preview.color} font={preview.font} image={image} music={music} />
      )}

      {!messageSendFinished && (
        <ControlPanel
          handleEdit={handleEdit}
          handleSend={() => {
            setMessageSendStarted(true);
            EventBehavior("Write Message", "Message Preview Phase", "Send Message");
            EventBehavior("Write Message", "Message Created", "New Message Created!");
            handleSend(preview, imageFile, musicFile, dispatch, user, setIsModalOpen, setChatId, setMessageId, setMessageUUID, setProfileName, setProfileImg);
          }}
        />
      )}

      {modalComponent}
    </>
  );
}
export default PreviewMessage;
