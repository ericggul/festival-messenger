import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const Utils = styled.div`
  display: flex;

  margin: 1rem 2rem;
  margin-top: 2.5rem;
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
  cursor: pointer;
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 0 0.6rem;
`;

export const Icon = styled.img`
  height: 2rem;
  width: auto;
`;
export const Text = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: light;
`;
