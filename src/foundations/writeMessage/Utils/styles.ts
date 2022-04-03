import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

//interface utils props showutils
interface UtilsProps {
  showUtils: boolean;
}

export const UtilContainer = styled.div<UtilsProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  ${FlexCenterStyle};
  flex-direction: column;

  ${({ showUtils }) => (showUtils ? "transform: 0;" : "transform: translateY(-80%);")};
  z-index: ${({ theme }) => theme.zIndex.modalBackground};
  transition: transform 0.3s;
`;

export const Utils = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};

  display: flex;
  padding: 1.5rem 0;
  padding-top: 2.5rem;
  justify-content: space-between;
`;

export const Back = styled.div`
  margin-left: 2rem;
  ${FlexCenterStyle};
  flex-direction: column;
  cursor: pointer;
`;

export const Settings = styled.div`
  margin-right: 2rem;
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
`;

export const Text = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: light;
`;

export const UtilsToggler = styled.div`
  width: 30%;
  height: 1.3rem;
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};
  ${FlexCenterStyle};
  cursor: pointer;
  border-radius: 0 0 0.5rem 0.5rem;
  position: relative;
`;

export const GhostDragger = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
