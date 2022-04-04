import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  position: relative;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
`;

interface FontInterface {
  font: any;
}

export const MessagePanel = styled.div<FontInterface>`
  width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;

  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 2;
  color: white !important;

  font-family: ${({ font }) => font};
`;

export const ToText = styled.div`
  margin-top: 130px;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
`;

export const ToTextInput = styled.input.attrs({
  type: "text",
  spellcheck: "false",
})`
  color: white;
  outline: 0;
  width: 15rem;
  text-size-adjust: auto;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid transparent;

  &::placeholder {
    color: white;
    opacity: 0.3;
    border-bottom: 1px solid white;
  }
`;

export const MainText = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
`;

export const MainTextInput = styled.textarea.attrs({
  spellcheck: "false",
})`
  outline: 0;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;

  text-size-adjust: auto;
  border: none;
  background: transparent;
  font-size: 1rem;

  border-bottom: 1px solid transparent;

  color: white;

  transition: all 0.3s;
  &:focus {
    border-bottom: 1px solid white;
  }

  &::placeholder {
    color: white;
    opacity: 0.3;
  }
`;

export const CompletePanel = styled.div`
  font-family: Seoul Namsan;
  width: 10rem;
  min-height: 2.7rem;
  cursor: pointer;
  border-radius: 1.75rem;
  background: #f7fdea;
  font-size: 1.3rem;
  color: black !important;
  font-weight: bold;
  ${FlexCenterStyle};
  box-shadow: 0 0 4rem #fff;
  margin: 2rem;
`;
