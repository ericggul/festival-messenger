import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  overflow-x: hidden;
  zindex: 1;
`;

export const CompleteButton = styled.div``;

export const InputBox = styled.input`
  outline: 0;

  border: solid 1px #ffffff;
  background-color: white;

  &::placeholder {
    color: ${(props) => props.theme.palette.HANDWRITING_INPUT};
  }
`;
