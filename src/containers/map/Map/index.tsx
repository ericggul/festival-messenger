import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";
import useModal from "@U/hooks/useModal";
import AddNewMessageModal from "@F/modal/content/AddNewMessageModal";

//Icons
import AddMessage from "@I/icons/map/add-message.svg";
import Explore from "@I/icons/map/explore.svg";
import Location2 from "@I/icons/map/location-2.svg";
import Update from "@I/icons/map/rotate-small-right.svg";
import Pin from "@I/icons/map/pin-1.svg";

//utils
import speak from "@U/functions/speak";

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
        speak("새로운 메시지는 페메에서. 새로운 실매물은 어디서? 집 토스에서!");
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
    () => {
      setMessageSendMode(false);
    }
  );

  const handleAddNewMessage = (latLng: any) => {
    setLatLng(latLng);
    setIsModalOpen(true);
  };

  //Reset Position
  const [reset, setReset] = useState(false);

  return (
    <>
      <S.Container ref={containerRef}>
        <MapBox
          handleMessageClick={(id: any) => setMessagePopupId(id)}
          handleAddNewMessage={handleAddNewMessage}
          messageSendMode={messageSendMode}
          //Reset Button
          resetState={reset}
          resetCompleted={() => setReset(false)}
        />
        <S.AddMessageButton onClick={() => setMessageSendMode((mode) => !mode)}>{messageSendMode ? "지도 상에 핀을 꽂아보세요" : " + 새로운 메시지 보내기"}</S.AddMessageButton>
        <S.GhostButton>
          <S.ButtonImg src={Location2} />
          <S.ButtonText>내위치</S.ButtonText>
        </S.GhostButton>
        <S.Button>
          <S.ButtonImg src={Update} />
          <S.ButtonText>업데이트</S.ButtonText>
        </S.Button>
        <S.ButtonLeft onClick={() => setReset(true)}>
          <S.ButtonImg src={Explore} />
          <S.ButtonText>버들골</S.ButtonText>
        </S.ButtonLeft>
      </S.Container>
      {addNewMessageModal}
    </>
  );
}
export default Map;
