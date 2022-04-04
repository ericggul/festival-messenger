import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  ${CS.Box};
  height: ${({ theme }) => (theme.windowWidth < 768 ? theme.windowHeight * 0.7 : theme.windowHeight * 0.9)}px;
  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
`;

export const CloseButton = styled.div`
  ${CS.CloseButton};
  background: ${({ theme }) => theme.palette.CANCEL_RED};
`;

export const CloseIcon = styled.img`
  ${CS.CloseIcon};
`;
