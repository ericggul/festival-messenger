import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";

//usenavigate
import { useNavigate } from "react-router-dom";

//Toast
import toast from "react-hot-toast";

//Modals
import useModal from "@U/hooks/useModal";
import AddNewMessageModal from "@F/modal/content/AddNewMessageModal";
import OpenMessageModal from "@F/modal/content/openMessage/OpenMessageModal";

//functions
import { deltaTime, SEVENTY_TWO_HOURS } from "@U/functions/timeConverter";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Icons
import Explore from "@I/icons/map/explore.svg";
import Location2 from "@I/icons/map/location-2.svg";
import Update from "@I/icons/map/rotate-small-right.svg";

function Map(props: any) {
  ///////
  //Popup Related
  ///////

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
        toast("메시지를 보낼 위치를 선택해주세요!");
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

  const handleMessageClick = (chatId: any, messageId: any) => {
    setChatPopupId(chatId);
    setMessagePopupId(messageId);
    setIsOpenMessageModalOpen(true);
  };

  ////////
  // Adding Message UX Related
  ///////

  const [focusAddMessageButton, setFocusAddMessageButton] = useState(props.focusAddMessageButton || false);
  const [addMessageToSelected, AddMessageToSelected] = useState<any>(props.addMessageTo || null);

  const navigate = useNavigate();
  const handleAddNewMessage = (latLng: any) => {
    setLatLng(latLng);
    if (addMessageToSelected) {
      //directly send message to friend
      getUserInformation(addMessageToSelected).then((res) => {
        navigate(`/writeMessage`, {
          state: {
            id: addMessageToSelected,
            name: res,
            latLng,
            uuid: "unassigned",
          },
        });
      });
    } else {
      setIsModalOpen(true);
    }
  };
  async function getUserInformation(idToRetrive: any) {
    try {
      const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(idToRetrive));
      return userInfo.payload.name;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  ///////
  //Data Related
  ///////
  //retriving chat
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users);
  const [chatsRetrived, setChatsRetrived] = useState(false);
  const [currentChats, setCurrentChats] = useState<any>([]);
  const [currentMessages, setCurrentMessages] = useState<any>([]);

  const [loadedChats, setLoadedChats] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!user.uid) {
      setCurrentChats([]);
      setAllLoaded(true);
      navigate("/login");
    }
    retriveChat();
  }, [user]);

  async function retriveChat() {
    try {
      let res = await dispatch(fetchChatsByMember(user.uid));
      setCurrentChats(sortChat(res.payload));
      setChatsRetrived(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (chatsRetrived) {
      //if user has no chat, automatically popup guidance
      if (currentChats.length === 0) {
        setFocusAddMessageButton(true);
      }

      setCurrentMessages([]);

      for (const chat of currentChats) {
        retriveMessages(chat.chatId);
      }
    }
  }, [currentChats, chatsRetrived]);

  async function retriveMessages(chatId: any) {
    try {
      const fetchedMessages = await dispatch(fetchAllMessages(chatId));
      //Filter 72 hours and and get only unread messages
      let sortedMessages = fetchedMessages.payload
        .filter((msg: any) => deltaTime(msg.createdAt) < SEVENTY_TWO_HOURS && msg.messageFrom !== user.uid)
        .sort((a: any, b: any) => b.createdAt.seconds - a.createdAt.seconds);
      setCurrentMessages((msg: any) => [...msg, { chatId: chatId, messages: sortedMessages }]);
      setLoadedChats((load) => load + 1);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (loadedChats === currentChats.length && chatsRetrived) {
      setAllLoaded(true);
    }
  }, [loadedChats, currentChats]);

  function sortChat(chats: any) {
    return chats.filter((chat: any) => deltaTime(chat.lastUpdatedAt) < SEVENTY_TWO_HOURS).sort((a: any, b: any) => b.lastUpdatedAt.seconds - a.lastUpdatedAt.seconds);
  }

  ///////
  //Position Related
  ///////
  //Reset Position
  const [reset, setReset] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);

  //get current position
  const [goToCurrentPosition, setGoToCurrentPosition] = useState(false);

  useEffect(() => {
    if (displayMap) {
      props.hideLoading();
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
            //current position related
            goToCurrentPosition={goToCurrentPosition}
            goToCurrentPositionCompleted={() => setGoToCurrentPosition(false)}
            //Reset Button
            resetState={reset}
            resetCompleted={() => setReset(false)}
            onMapDisplayed={() => setDisplayMap(true)}
            //data
            currentMessages={currentMessages}
            user={user}
          />
        )}

        {messageSendMode ? (
          <S.AddMessageButton show={displayMap} onClick={() => setMessageSendMode((mode) => !mode)}>
            {"지도 상에 핀을 꽂아보세요"}
          </S.AddMessageButton>
        ) : (
          <S.AddMessageButton
            show={displayMap}
            onClick={() => {
              setMessageSendMode((mode) => !mode);
              setFocusAddMessageButton(false);
            }}
            focusAddMessageButton={focusAddMessageButton}
          >
            {"+ 새로운 메시지 보내기"
              .trim()
              .split("")
              .map((t: String, i: number, array: any) => (
                <S.Span key={i} idx={i}>
                  {t === " " ? "\u00A0" : t}
                </S.Span>
              ))}
          </S.AddMessageButton>
        )}
        {focusAddMessageButton && (
          <S.AddMessageButtonFocus show={displayMap}>
            {new Array(10).fill(0).map((e, i) => (
              <S.FocusText key={i} idx={i}>
                새로운 메시지 보내기 버튼을 눌러주세요.
              </S.FocusText>
            ))}
          </S.AddMessageButtonFocus>
        )}

        <S.GhostButton show={displayMap} onClick={() => setGoToCurrentPosition(true)}>
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
