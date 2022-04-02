import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";
import useModal from "@U/hooks/useModal";
import AddNewMessageModal from "@F/modal/content/AddNewMessageModal";

//Icons
import AddMessage from "@I/icons/map/add-message.svg";

function Map() {
  //Message Popup
  const [messageSendMode, setMessageSendMode] = useState(false);
  const [messagePopupId, setMessagePopupId] = useState(null);

  //Cursor change on message send mode
  const containerRef = useRef<any>(!null);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      if (messageSendMode) {
        containerRef.current.style.cursor = "pointer";
      }
    }
  }, [messageSendMode, containerRef]);

  //New Message Add Popup
  const [latLng, setLatLng] = useState<any>(!null);
  const {
    modalComponent: addNewMessageModal,
    isModalOpen,
    setIsModalOpen,
  } = useModal(
    AddNewMessageModal,
    true,
    {
      latLng: latLng,
    },
    () => setMessageSendMode(false)
  );

  const handleAddNewMessage = (latLng: any) => {
    setLatLng(latLng);
    setIsModalOpen(true);
  };

  return (
    <>
      <S.Container ref={containerRef}>
        <MapBox handleMessageClick={(id: any) => setMessagePopupId(id)} handleAddNewMessage={handleAddNewMessage} messageSendMode={messageSendMode} />
        <S.AddMessageButton onClick={() => setMessageSendMode((mode) => !mode)}>{messageSendMode ? "지도 상에 핀을 꽂아보세요" : " + 새로운 메시지 보내기"}</S.AddMessageButton>
      </S.Container>
      {addNewMessageModal}
    </>
  );
}
export default Map;
