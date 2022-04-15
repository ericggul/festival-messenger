import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";
import useModal from "@U/hooks/useModal";
import AddNewMessageModal from "@F/modal/content/AddNewMessageModal";
import OpenMessageModal from "@F/modal/content/openMessage/OpenMessageModal";

import LoadingContainer from "@C/Loading";

////redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Icons
import Explore from "@I/icons/map/explore.svg";
import Location2 from "@I/icons/map/location-2.svg";
import Update from "@I/icons/map/rotate-small-right.svg";

//utils
import speak from "@U/functions/speak";

function Map() {
  const user = useAppSelector((state) => state.users);
  console.log(user);
  //Message Send Popup
  const [messageSendMode, setMessageSendMode] = useState(false);
  const [latLng, setLatLng] = useState<any>(!null);

  //Message Open Popup
  const [chatPopupId, setChatPopupId] = useState<any>(null);
  const [messagePopupId, setMessagePopupId] = useState<any>(null);

  //Cursor change on message send mode
  const containerRef = useRef<any>(!null);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      if (messageSendMode) {
        containerRef.current.style.cursor = "pointer";
        // speak("새로운 메시지 추가하기!");
      }
    }
  }, [messageSendMode, containerRef]);

  //New Message Add Popup
  const {
    modalComponent: addNewMessageModalComponent,
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

  //Open Message Popup
  const {
    modalComponent: openMessageModalComponent,
    isModalOpen: isOpenMessageModalOpen,
    setIsModalOpen: setIsOpenMessageModalOpen,
  } = useModal(OpenMessageModal, true, {
    chatId: chatPopupId,
    messageId: messagePopupId,
  });

  const handleAddNewMessage = (latLng: any) => {
    setLatLng(latLng);
    setIsModalOpen(true);
  };

  const handleMessageClick = (chatId: any, messageId: any) => {
    setChatPopupId(chatId);
    setMessagePopupId(messageId);
    setIsOpenMessageModalOpen(true);
  };

  //Reset Position
  const [reset, setReset] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);

  return (
    <>
      <S.Container ref={containerRef}>
        <MapBox
          handleMessageClick={handleMessageClick}
          handleAddNewMessage={handleAddNewMessage}
          messageSendMode={messageSendMode}
          //Reset Button
          resetState={reset}
          resetCompleted={() => setReset(false)}
          onMapDisplayed={() => setDisplayMap(true)}
        />
        <S.AddMessageButton show={displayMap} onClick={() => setMessageSendMode((mode) => !mode)}>
          {messageSendMode ? "지도 상에 핀을 꽂아보세요" : " + 새로운 메시지 보내기"}
        </S.AddMessageButton>
        <S.GhostButton show={displayMap}>
          <S.ButtonImg src={Location2} />
          <S.ButtonText>내위치</S.ButtonText>
        </S.GhostButton>
        <S.Button show={displayMap}>
          <S.ButtonImg src={Update} />
          <S.ButtonText>업데이트</S.ButtonText>
        </S.Button>
        <S.ButtonLeft onClick={() => setReset(true)} show={displayMap}>
          <S.ButtonImg src={Explore} />
          <S.ButtonText>버들골</S.ButtonText>
        </S.ButtonLeft>
        {!displayMap && <LoadingContainer />}
      </S.Container>
      {addNewMessageModalComponent}
      {openMessageModalComponent}
    </>
  );
}
export default Map;
