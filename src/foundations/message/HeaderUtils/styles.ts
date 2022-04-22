import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const HeaderUtils = styled.div`
  position: absolute;
  top: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: white;
  z-index: ${({ theme }) => theme.zIndex.headerText};
`;

export const Back = styled.div`
  ${FlexCenterStyle};
  margin-left: 1.5rem;
  cursor: pointer;
`;

export const Icon = styled.img`
  height: 1rem;
  width: auto;
  margin-right: 0.3rem;
`;

export const Text = styled.div`
  min-width: 10rem;
`;

interface ReplyProps {
  cursor: any;
}

export const Reply = styled.div<ReplyProps>`
  margin-right: 1.5rem;
  cursor: ${({ cursor }) => cursor};
`;
