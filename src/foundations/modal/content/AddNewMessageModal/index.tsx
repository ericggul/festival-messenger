import React, { useEffect, useState, useRef, useMemo } from "react";
import useAuth, { NO_PROFILE } from "@U/hooks/useAuth";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import { useNavigate } from "react-router-dom";

import LoadingContainer from "@C/Loading";

//icons
import Cancel from "@I/icons/modal/cancel.svg";
import Send from "@I/icons/footer/outline/send.svg";

//redux
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";

//analytics
import { EventBehavior } from "@U/initializer/googleAnalytics";

const SingleProfile = ({ friend, i, clickedFriend, setClickedFriend, handleIconClick }: any) => {
  const uid = useMemo(() => `kakao:${friend.id}`, [friend]);
  const [profilePic, setProfilePic] = useState(friend.profile_thumbnail_image);
  const [profileName, setProfileName] = useState(friend.profile_nickname);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserInformation();
  }, [friend]);

  async function getUserInformation() {
    try {
      const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(uid));

      if (userInfo.payload.profileImage) {
        setProfilePic(userInfo.payload.profileImage);
      }
      if (userInfo.payload.name) {
        setProfileName(userInfo.payload.name);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <S.FriendRow onClick={() => setClickedFriend(i)} selected={clickedFriend === i} key={i}>
      <S.Left>
        <S.ProfileImg src={profilePic} />
        <S.FriendText>{profileName}</S.FriendText>
      </S.Left>
      {clickedFriend === i ? (
        <S.SendText onClick={(e: any) => handleIconClick(uid, profileName, e, friend.uuid)}>Next</S.SendText>
      ) : (
        <S.SendIcon onClick={(e: any) => handleIconClick(uid, profileName, e, friend.uuid)} src={Send} />
      )}
    </S.FriendRow>
  );
};

function AddNewMessageModal({ setIsModalOpen, latLng }: any) {
  const [clickedFriend, setClickedFriend] = useState<number>(-1);
  const upperRef = useRef<any>(!null);

  const navigate = useNavigate();

  const handleIconClick = (id: any, name: any, ev: any, uuid: any) => {
    if (uuid == "unassignd" || id == -1) {
      EventBehavior("Map", "Map Add Message Steps", "4-2. Selected Friend Not on the List");
    } else {
      EventBehavior("Map", "Map Add Message Steps", "4-1. Selected Friend On the List");
    }
    if (ev) {
      ev.stopPropagation();
    }

    navigate(`/writeMessage`, {
      state: {
        id,
        name,
        latLng,
        uuid,
      },
    });
  };

  //Bring Friends from Kakao
  const user = useAppSelector((state) => state.users);

  const [loadingForLogin, setLoadingForLogin] = useState(false);

  //friends
  const [goneThroughKakaoAPI, setGoneThroughKakaoAPI] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    if (goneThroughKakaoAPI && friends.length === 0) {
      handleIconClick(-1, null, null, "unassigned");
    }
  }, [friends, goneThroughKakaoAPI]);

  const kakaoApiBringFriends = async (offset: any) => {
    await window.Kakao.API.request({
      url: "/v1/api/talk/friends",
      data: {
        offset: offset,
        limit: 10,
        order: "asc",
      },
      success: (res: any) => {
        if (res.after_url) {
          kakaoApiBringFriends(offset + 10);
        }
        setFriends((friends) => [...friends, ...res.elements]);
        setGoneThroughKakaoAPI(true);
      },
      fail: (err: any) => {
        alert("재로그인이 필요합니다!");
        setLoadingForLogin(true);

        navigate(`/login`, {
          state: {
            navigateTo: `/map`,
          },
        });
        console.log(err);
      },
    });
  };

  const bringFriends = () => {
    if (user.token) {
      const token = window.Kakao.Auth.getAccessToken();
      window.Kakao.Auth.setAccessToken(token);
      kakaoApiBringFriends(0);
    } else {
      alert(user.uid ? "재로그인이 필요합니다!" : "로그인이 필요합니다!");
      setLoadingForLogin(true);
      navigate(`/login`, {
        state: {
          navigateTo: `/map`,
        },
      });
    }
  };

  //initially bring friends
  useEffect(() => {
    bringFriends();
  }, []);

  return (
    <>
      <S.Background />
      {!loadingForLogin && (
        <S.Box>
          <S.CloseButton onClick={() => setIsModalOpen(false)}>
            <S.CloseIcon src={Cancel} />
          </S.CloseButton>

          <S.Contents>
            <S.Upper ref={upperRef}>
              <S.Header>친구 선택</S.Header>
              <S.FriendsList>
                {friends.map((friend: any, i: number) => (
                  <SingleProfile key={i} friend={friend} i={i} clickedFriend={clickedFriend} setClickedFriend={setClickedFriend} handleIconClick={handleIconClick} />
                ))}
              </S.FriendsList>
            </S.Upper>

            <S.OtherFriendsList>
              <S.ExplText>
                <div>친구가 아직 페스티벌 메신저에 가입하지 않았을 경우,</div>
                <div>위 친구 목록에 게시되지 않습니다.</div>
              </S.ExplText>
              <S.OtherFriendsListHeader
                onClick={(e: any) => {
                  handleIconClick(-1, null, e, "unassigned");
                }}
              >
                <S.OtherFriendsListHeaderText>리스트에 없는 친구에게 보내기</S.OtherFriendsListHeaderText>
                <S.SendIcon src={Send} />
              </S.OtherFriendsListHeader>
            </S.OtherFriendsList>
          </S.Contents>
        </S.Box>
      )}
      {loadingForLogin && <LoadingContainer />}
    </>
  );
}

export default AddNewMessageModal;
