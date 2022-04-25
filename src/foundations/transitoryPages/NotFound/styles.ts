import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const SceneContainer = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Text = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: white;
  z-index: 5;
  position: absolute;
  bottom: 0;
  margin-bottom: 3rem;
  text-align: center;
  width: 100%;
`;

export const Button = styled.div`
  font-size: 1.2rem;
  color: white;
  z-index: 5;
  position: absolute;
  width: 5rem;
  padding: 0;
  margin: 0;

  cursor: pointer;
  top: 0;
  margin-top: 3rem;
  text-align: center;
  width: 100%;
`;
