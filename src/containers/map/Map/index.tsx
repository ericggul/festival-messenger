import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";
import useModal from "@U/hooks/useModal";
import SignInModal from "@F/modal/content/SignInModal";

//Icons
import AddMessage from "@I/icons/map/add-message.svg";

function Map() {
  const [messageSendMode, setMessageSendMode] = useState(false);
  const [messagePopupId, setMessagePopupId] = useState(null);

  const { modalComponent: signInModal, isModalOpen, setIsModalOpen } = useModal(SignInModal, true, true, () => setMessageSendMode(false));

  //cursor change on message send mode
  const containerRef = useRef<any>(!null);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      if (messageSendMode) {
        containerRef.current.style.cursor = "pointer";
      }
    }
  }, [messageSendMode, containerRef]);

  const handleAddNewMessage = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <S.Container ref={containerRef}>
        <MapBox handleMessageClick={(id: any) => setMessagePopupId(id)} handleAddNewMessage={handleAddNewMessage} messageSendMode={messageSendMode} />
        <S.AddMessageButton onClick={() => setMessageSendMode(true)}>{messageSendMode ? "지도 상에 핀을 꽂아보세요" : " + 새로운 메시지 보내기"}</S.AddMessageButton>
      </S.Container>
      {signInModal}
    </>
  );
}
export default Map;
