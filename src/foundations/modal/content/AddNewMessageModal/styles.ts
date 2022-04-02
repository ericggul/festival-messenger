import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Background = styled.div`
  pointer-events: none;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.2rem);
  -webkit-backdrop-filter: blur(0.2rem);
  animation: ${AppearAnimation} 0.3s;
  z-index: ${({ theme }) => theme.zIndex.modalBackground};
`;

export const Box = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: center;

  opacity: 0;
  animation: ${AppearAnimation} 1s forwards;
  animation-delay: 0.3s;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.16);

  height: ${({ theme }) => (theme.windowWidth < 768 ? theme.windowHeight * 0.7 : theme.windowHeight * 0.9)}px;
  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
  z-index: ${({ theme }) => theme.zIndex.modalContent};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4rem);
  -webkit-backdrop-filter: blur(4rem);
`;

export const CloseButton = styled.div`
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  font-size: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #aaa;
  color: white;
  ${FlexCenterStyle};
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

export const CloseIcon = styled.img`
  width: 70%;
  height: 70%;
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

export const Right = styled.div``;

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
  font-weight: 800;
`;
