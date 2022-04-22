import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  ${CS.Box}

  height: ${({ theme }) => (theme.windowWidth < 768 ? theme.windowHeight * 0.7 : theme.windowHeight * 0.9)}px;
  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
`;

export const CloseButton = styled.div`
  ${CS.CloseButton}
`;

export const CloseIcon = styled.img`
  ${CS.CloseIcon}
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.75rem;
  margin-bottom: 0;

  max-height: ${({ theme }) => (theme.windowWidth < 768 ? theme.windowHeight * 0.7 - 150 : theme.windowHeight * 0.9 - 100)}px;
  overflow: scroll;
  position: relative;
`;

export const Header = styled.div`
  ${FlexCenterStyle};
  text-align: center;
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 1.25rem;
`;

export const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.25rem;
  margin-right: 1rem;
`;

interface FriendRowInterface {
  selected: boolean;
}

export const FriendRow = styled.div<FriendRowInterface>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25rem 0;
  margin-right: 0.75rem;
  width: 100%;

  cursor: pointer;

  ${({ selected }) => selected && "background: rgba(255, 255, 255, .6)"};
  ${({ selected }) => selected && "box-shadow: 0 0 .5rem white"};
  border-radius: 1.75rem;
  transition: all 0.5s;
`;

export const SendText = styled.div`
  height: 3.5rem;
  border-radius: 1.75rem;
  width: 3.5rem;
  font-size: 1rem;
  background: #ccc;
  ${FlexCenterStyle};
`;

export const Left = styled.div`
  display: flex;
`;
export const ProfileImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

export const FriendText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1.4rem;
  ${FlexCenterStyle};
  height: 3.5rem;
`;

export const ScrollGuide = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  font-size: 0.7rem;
  color: white;
  ${FlexCenterStyle};
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
`;

export const SendIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

export const OtherFriendsList = styled.div`
  margin: 1.75rem;

  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
`;

export const ExplText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
`;

export const OtherFriendsListHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
`;

export const OtherFriendsListHeaderText = styled.div`
  margin-top: 0.7rem;
  font-size: 1.2rem;
  font-weight: 900;
`;
