import styled from "styled-components";
import { FlexCenterStyle } from "@/static/style/responsive/display";

export const ControlPanel = styled.div`
  position: fixed;
  bottom: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: 8rem;
  color: white;

  backdrop-filter: blur(3rem);
  -webkit-backdrop-filter: blur(3rem);
  background: linear-gradient(rgba(200, 200, 200, 0.2), rgba(200, 200, 200, 0.4) 70%);

  ${FlexCenterStyle};
  flex-direction: row;
  z-index: 5000;
  // z-index: ${({ theme }) => theme.zIndex.headerColor};
`;

export const Button = styled.div`
  cursor: pointer !important;
  pointer-events: auto;
  ${FlexCenterStyle};
  flex-direction: column;
  padding: 0 12vw;
`;

export const Img = styled.img`
  height: 3rem;
  width: auto;
  cursor: pointer;
`;

export const Text = styled.div`
  margin-top: 0.7rem;
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0.3rem;
`;
