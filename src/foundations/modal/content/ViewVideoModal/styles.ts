import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  ${CS.Box}

  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
`;

export const CloseButton = styled.div`
  ${CS.CloseButton}
`;

export const CloseIcon = styled.img`
  ${CS.CloseIcon}
`;

export const Contents = styled.div`
  ${FlexCenterStyle};
  height: 100%;
  flex-direction: column;
`;

export const Header = styled.div`
  margin: 2rem 0;
  h1 {
    margin: 0.3rem 0;
    padding: 0;
    font-size: 1.2rem;
  }
`;

export const Video = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
  height: ${({ theme }) => (Math.min(theme.windowWidth, 768) * 0.9 * 315) / 560}px;
  border-radius: 0.75rem;
`;
