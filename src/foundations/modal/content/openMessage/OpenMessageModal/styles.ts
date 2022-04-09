import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
  border-radius: 0.75rem;
  backdrop-filter: blur(0.7rem);
  -webkit-backdrop-filter: blur(0.7rem);
`;

export const Box = styled.div`
  ${CS.Box}
  border-radius: 0.75rem;
  background: transparent;
  backdrop-filter: blur(3rem);
  -webkit-backdrop-filter: blur(3rem);

  padding: 2rem 0;
  width: ${({ theme }) => Math.min(theme.windowWidth, 550) * 0.9}px;
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
`;

export const Text = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  font-size: 1.5rem;
  color: white;

  p {
    margin: 0;
    padding: 0;
  }
`;
