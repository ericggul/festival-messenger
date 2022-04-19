import React, { useEffect, useState, useRef } from "react";
import useAuth from "@U/hooks/useAuth";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@R/common/hooks";

import LoadingContainer from "@C/Loading";

//icons
import Cancel from "@I/icons/modal/cancel.svg";
import Send from "@I/icons/footer/outline/send.svg";

const TEST_DATA = [
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/1ArtNoveau/1.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/1ArtNoveau/1.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
];

function AddNewMessageModal({ setIsModalOpen, latLng }: any) {
  const [clickedFriend, setClickedFriend] = useState<number>(-1);

  const upperRef = useRef<any>(!null);
  const [windowWidth, windowHeight] = useResize();

  const navigate = useNavigate();

  const handleIconClick = (i: any, name: any, ev: any) => {
    //To implement: Uid
    const id = i;
    ev.stopPropagation();
    navigate(`/writeMessage`, {
      state: {
        id,
        name,
        latLng,
      },
    });
  };

  //Bring Friends from Kakao
  const user = useAppSelector((state) => state.users);
  const { signIn } = useAuth("/map");

  const [loadingForLogin, setLoadingForLogin] = useState(false);

  const bringFriends = () => {
    if (user.token) {
      const token = window.Kakao.Auth.getAccessToken();

      window.Kakao.Auth.setAccessToken(token);

      window.Kakao.API.request({
        url: "/v1/api/talk/friends",
        success: (res: any) => {
          console.log(res);
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
                {TEST_DATA.map((data: any, i: number) => (
                  <S.FriendRow onClick={() => setClickedFriend(i)} selected={clickedFriend === i} key={i}>
                    <S.Left>
                      <S.ProfileImg src={data.profileImg} />
                      <S.FriendText>{data.name}</S.FriendText>
                    </S.Left>
                    {clickedFriend === i ? (
                      <S.SendText onClick={(e: any) => handleIconClick(i, data.name, e)}>Next</S.SendText>
                    ) : (
                      <S.SendIcon onClick={(e: any) => handleIconClick(i, data.name, e)} src={Send} />
                    )}
                  </S.FriendRow>
                ))}
              </S.FriendsList>
            </S.Upper>

            <S.OtherFriendsList>
              <S.ExplText>
                <div>친구가 아직 페스티벌 메신저에 가입하지 않았을 경우,</div>
                <div>위 친구 목록에 게시되지 않습니다.</div>
              </S.ExplText>
              <S.OtherFriendsListHeader onClick={(e: any) => handleIconClick(-1, null, e)}>
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
