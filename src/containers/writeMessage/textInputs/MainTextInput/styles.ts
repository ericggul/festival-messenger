import styled from "styled-components";

interface IsTextBlack {
  isTextBlack: boolean;
}

export const MainText = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
`;

export const MainTextInput = styled.textarea.attrs({
  spellCheck: "false",
  rows: 15,
})<IsTextBlack>`
  outline: 0;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
  min-height: 5rem;
  white-space: pre-wrap;

  line-height: 1.5rem;
  background: transparent;

  text-size-adjust: auto;
  border: none;

  font-size: 1rem;

  border-radius: 0;
  border-bottom: 1px solid transparent;

  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};

  transition: all 0.5s;

  &:focus {
    border-bottom: 1px solid white;
  }

  &::placeholder {
    color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};
    opacity: 0.3;
  }
`;
