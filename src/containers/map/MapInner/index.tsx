import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";

//Modals
import useModal from "@U/hooks/useModal";
import AddNewMessageModal from "@F/modal/content/AddNewMessageModal";
import OpenMessageModal from "@F/modal/content/openMessage/OpenMessageModal";

//Loading
import LoadingContainer from "@C/Loading";

//navigate
import { useNavigate } from "react-router-dom";

//functions
import { deltaTime, SEVENTY_TWO_HOURS } from "@U/functions/timeConverter";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Icons
import Explore from "@I/icons/map/explore.svg";
import Location2 from "@I/icons/map/location-2.svg";
import Update from "@I/icons/map/rotate-small-right.svg";
import message from "@/pages/message";

function Map({ hideLoading }: any) {
  //popup related
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

  //data related
  //retriving chat
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.users);
  const chatsReduxState = useAppSelector((state) => state.chats);
  const [currentChats, setCurrentChats] = useState<any>([]);
  const [currentMessages, setCurrentMessages] = useState<any>([]);

  const [loadedChats, setLoadedChats] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!user.uid) {
      setCurrentChats([]);
      return;
    }
    retriveChat();
  }, [user]);

  async function retriveChat() {
    try {
      let res = await dispatch(fetchChatsByMember(user.uid));
      setCurrentChats(sortChat(res.payload));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setCurrentMessages([]);

    for (const chat of currentChats) {
      retriveMessages(chat.chatId);
    }
  }, [currentChats]);

  async function retriveMessages(chatId: any) {
    try {
      const fetchedMessages = await dispatch(fetchAllMessages(chatId));
      //Filter 72 hours and and get only unread messages
      let sortedMessages = fetchedMessages.payload.filter((msg: any) => deltaTime(msg.createdAt) < SEVENTY_TWO_HOURS && !msg.read).sort((a: any, b: any) => b.createdAt.seconds - a.createdAt.seconds);
      setCurrentMessages((msg: any) => [...msg, { chatId: chatId, messages: sortedMessages }]);
      setLoadedChats((load) => load + 1);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (loadedChats === currentChats.length && currentChats.length > 0) {
      setAllLoaded(true);
    }
  }, [loadedChats, currentChats]);

  function sortChat(chats: any) {
    return chats.filter((chat: any) => deltaTime(chat.lastUpdatedAt) < SEVENTY_TWO_HOURS).sort((a: any, b: any) => b.lastUpdatedAt.seconds - a.lastUpdatedAt.seconds);
  }

  //position related
  //Reset Position
  const [reset, setReset] = useState(false);

  const [displayMap, setDisplayMap] = useState(false);

  useEffect(() => {
    if (displayMap) {
      hideLoading();
    }
  }, [displayMap]);

  return (
    <>
      <S.Container ref={containerRef}>
        {allLoaded && (
          <MapBox
            //modal related
            handleMessageClick={handleMessageClick}
            handleAddNewMessage={handleAddNewMessage}
            messageSendMode={messageSendMode}
            //Reset Button
            resetState={reset}
            resetCompleted={() => setReset(false)}
            onMapDisplayed={() => setDisplayMap(true)}
            //data
            currentMessages={currentMessages}
            user={user}
          />
        )}
        <S.AddMessageButton show={displayMap} onClick={() => setMessageSendMode((mode) => !mode)}>
          {messageSendMode ? "지도 상에 핀을 꽂아보세요" : " + 새로운 메시지 보내기"}
        </S.AddMessageButton>
        <S.GhostButton show={displayMap}>
          <S.ButtonImg src={Location2} />
          <S.ButtonText>내위치</S.ButtonText>
        </S.GhostButton>
        <S.Button show={displayMap} onClick={retriveChat}>
          <S.ButtonImg src={Update} />
          <S.ButtonText>업데이트</S.ButtonText>
        </S.Button>
        <S.ButtonLeft onClick={() => setReset(true)} show={displayMap}>
          <S.ButtonImg src={Explore} />
          <S.ButtonText>버들골</S.ButtonText>
        </S.ButtonLeft>
      </S.Container>
      {addNewMessageModalComponent}
      {openMessageModalComponent}
    </>
  );
}
export default Map;
