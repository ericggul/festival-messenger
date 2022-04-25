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
      setProfilePic(userInfo.payload.profileImage);
      setProfileName(userInfo.payload.name);
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
    EventBehavior("Map", "Map Add Message Steps", "4. Selected Friend");

    ev.stopPropagation();
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
  const { signIn } = useAuth("/map");
  const [loadingForLogin, setLoadingForLogin] = useState(false);

  //friends
  const [friends, setFriends] = useState([]);

  const bringFriends = () => {
    if (user.token) {
      const token = window.Kakao.Auth.getAccessToken();
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.API.request({
        url: "/v1/api/talk/friends",
        success: (res: any) => {
          console.log(res.elements);
          setFriends(res.elements);
        },
        fail: (err: any) => {
          alert("재로그인이 필요합니다!");
          setLoadingForLogin(true);
          signIn();
          console.log(err);
        },
      });
    } else {
      alert(user.uid ? "재로그인이 필요합니다!" : "로그인이 필요합니다!");
      setLoadingForLogin(true);
      signIn();
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
              <S.OtherFriendsListHeader onClick={(e: any) => handleIconClick(-1, null, e, "unassigned")}>
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
