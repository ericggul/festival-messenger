import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//Mapbox
import MapBox from "@F/map/MapBox";

//hooks
import useAuth from "@U/hooks/useAuth";

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
import preloadImage from "@U/functions/preload";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Icons
import Explore from "@I/icons/map/explore.svg";
import Location2 from "@I/icons/map/location-2.svg";
import Update from "@I/icons/map/rotate-small-right.svg";
import AddMessage from "@I/icons/map/add-message.svg";

//analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

function Map(props: any) {
  //preload image
  useEffect(() => {
    preloadImage(AddMessage);
  }, []);

  const [focusAddMessageButton, setFocusAddMessageButton] = useState(props.focusAddMessageButton || false);
  const [addMessageToSelected, AddMessageToSelected] = useState<any>(props.addMessageTo || null);

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
        EventBehavior("Map", "Map Add Message Steps", "1. Add Message Button Clicked");
        toast(focusAddMessageButton ? "메시지를 보낼 위치를 선택해주세요! 친구는 그 장소에서만 메시지를 읽을 수 있습니다." : "메시지를 보낼 위치를 선택해주세요!");
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

  const navigate = useNavigate();
  const handleAddNewMessage = async (latLng: any) => {
    setLatLng(latLng);
    EventBehavior("Map", "Map Add Message Steps", "2. Lat Lng Position Selected");
    if (addMessageToSelected) {
      EventBehavior("Map", "Map Add Message Steps", "3-1. Friend Already Selected");
      //get kakao talk uuid from friend api
      let kakaoUUID = await getFriendUUID(addMessageToSelected);

      //directly send message to friend
      let friendName = await getUserInformation(addMessageToSelected);

      navigate(`/writeMessage`, {
        state: {
          id: addMessageToSelected,
          name: friendName,
          latLng,
          uuid: kakaoUUID || "unassigned",
        },
      });
    } else {
      EventBehavior("Map", "Map Add Message Steps", "3-2. Selecting Friend to Send");
      setIsModalOpen(true);
    }
  };

  //get user name from DB
  async function getUserInformation(idToRetrive: any) {
    try {
      const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(idToRetrive));
      return userInfo.payload.name;
    } catch (e) {
      console.log(e);
      return "No Name";
    }
  }

  //get Kakao Friend API UUID from ID

  const { signIn } = useAuth("/map");

  const kakaoApiBringFriends = async (offset: any, parsedUID: any) => {
    let friend: any = null;
    await window.Kakao.API.request({
      url: "/v1/api/talk/friends",
      data: {
        offset: offset,
        limit: 100,
        order: "asc",
      },
      success: (res: any) => {
        friend = res.elements.find((friend: any) => friend.id == parsedUID);
        if (friend) {
        } else if (res.after_url) {
          kakaoApiBringFriends(offset + 100, parsedUID);
        }
      },
      fail: (err: any) => {
        alert("재로그인이 필요합니다!");
        signIn();
        return null;
      },
    });
    return friend ? friend.uuid : null;
  };

  const getFriendUUID = async (uid: any) => {
    let parsedUID = uid.split("kakao:")[1];

    let friend: any = null;
    if (!uid.includes("kakao:")) {
      return "unassigned";
    }
    if (user.token) {
      const token = window.Kakao.Auth.getAccessToken();
      window.Kakao.Auth.setAccessToken(token);
      friend = await kakaoApiBringFriends(0, parsedUID);
    } else {
      alert(user.uid ? "재로그인이 필요합니다!" : "로그인이 필요합니다!");
      signIn();
      return null;
    }

    return friend;
  };

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
    } else {
      retriveChat();
    }
  }, [user]);

  async function retriveChat() {
    EventBehavior("Map", "Map Buttons", "Update button");
    try {
      let res = await dispatch(fetchChatsByMember(user.uid));
      if (!res.payload || !user.uid) {
        setCurrentChats([]);
      } else {
        setCurrentChats(sortChat(res.payload));
      }
      setChatsRetrived(true);
    } catch (e) {
      alert("Error!");
      setCurrentChats([]);
      setChatsRetrived(true);
      navigate("/login");
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
        .sort((a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds);
      setCurrentMessages((msg: any) => [...msg, { chatId: chatId, messages: sortedMessages }]);
      setLoadedChats((load) => load + 1);
    } catch (e) {
      navigate("/login");
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

  function getChatsMessagesLength(chatMessages: any) {
    let i = 0;

    chatMessages.forEach((chat: any) => {
      chat.messages.forEach((msg: any) => {
        i++;
      });
    });

    return i;
  }

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
            <S.FocusText>새로운 메시지 보내기 버튼을 눌러주세요.</S.FocusText>
          </S.AddMessageButtonFocus>
        )}

        <S.GhostButton
          show={displayMap}
          onClick={() => {
            EventBehavior("Map", "Map Buttons", "Current Pos button");
            setGoToCurrentPosition(true);
          }}
        >
          <S.ButtonImg src={Location2} />
          <S.ButtonText>내위치</S.ButtonText>
        </S.GhostButton>
        <S.Button show={displayMap} onClick={retriveChat}>
          <S.ButtonImg src={Update} />
          <S.ButtonText>업데이트</S.ButtonText>
        </S.Button>
        <S.ButtonLeft
          onClick={() => {
            setReset(true);
            EventBehavior("Map", "Map Buttons", "Beoudeolgol button");
          }}
          show={displayMap}
        >
          <S.ButtonImg src={Explore} />
          <S.ButtonText>버들골</S.ButtonText>
        </S.ButtonLeft>
        <S.Recieved show={displayMap} onClick={() => navigate("/messenger")}>{`받은 메시지 ${getChatsMessagesLength(currentMessages)}개`}</S.Recieved>
      </S.Container>
      {addNewMessageModalComponent}
      {openMessageModalComponent}
    </>
  );
}
export default Map;
