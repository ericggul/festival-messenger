import React from "react";
import useAuth from "@U/hooks/useAuth";
import * as S from "./styles";

//icons
import Cancel from "@I/icons/modal/cancel.svg";
import Send from "@I/icons/footer/outline/send.svg";

const TEST_DATA = [
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/1ArtNoveau/1.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
  { name: "배우진", profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png" },
  { name: "홍길동", profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png" },
];

function AddNewMessageModal({ setIsModalOpen }: any) {
  return (
    <>
      <S.Background />
      <S.Box>
        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>

        <S.Contents>
          <S.Upper>
            <S.Header>친구 선택</S.Header>
            <S.FriendsList>
              {TEST_DATA.map((data: any, i: number) => (
                <S.FriendRow>
                  <S.Left>
                    <S.ProfileImg src={data.profileImg} />
                    <S.FriendText>{data.name}</S.FriendText>
                  </S.Left>

                  <S.Right>
                    <S.SendIcon src={Send} />
                  </S.Right>
                </S.FriendRow>
              ))}
            </S.FriendsList>
          </S.Upper>

          <S.OtherFriendsList>
            <S.ExplText>
              <p>친구가 아직 페스티벌 메신저에 가입하지 않았을 경우,</p>
              <p>위 친구 목록에 게시되지 않습니다.</p>
            </S.ExplText>
            <S.OtherFriendsListHeader>
              <S.OtherFriendsListHeaderText>위 리스트에 없는 친구</S.OtherFriendsListHeaderText>
              <S.SendIcon src={Send} />
            </S.OtherFriendsListHeader>
          </S.OtherFriendsList>
        </S.Contents>
      </S.Box>
    </>
  );
}

export default AddNewMessageModal;
