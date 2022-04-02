import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Utils = styled.div`
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};
  z-index: ${({ theme }) => theme.zIndex.modalBackground};
  display: flex;
  padding: 1.5rem 2rem;
  padding-top: 2.5rem;
  justify-content: space-between;
`;

export const Back = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  cursor: pointer;
`;

export const Settings = styled.div`
  ${FlexCenterStyle};
`;
export const Setting = styled.div`
  position: relative;
  cursor: pointer;
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 0 0.6rem;
`;

interface IconProps {
  highlight: boolean;
}

export const Icon = styled.img<IconProps>`
  height: 2rem;
  width: auto;
  ${({ highlight }) => highlight && `filter: drop-shadow(0 0 0.5rem yellow); -webkit-filter: drop-shadow(0 0 0.5rem yellow);`}
`;

export const Text = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: light;
`;
