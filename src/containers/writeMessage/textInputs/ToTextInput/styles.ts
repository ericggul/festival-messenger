import styled from "styled-components";

interface IsTextBlack {
  isTextBlack: boolean;
}

export const ToText = styled.div<IsTextBlack>`
  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};
  margin-top: 130px;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;

  transition: all 0.3s;
`;

export const ToTextInput = styled.input.attrs({
  type: "text",
  spellcheck: "false",
})<IsTextBlack>`
  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};
  outline: 0;
  width: 10rem;
  text-size-adjust: auto;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
  &::placeholder {
    padding-bottom: 0.3rem;
    font-size: 1rem;
    color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};
    opacity: 0.3;
    border-bottom: 1px solid white;
  }
`;
