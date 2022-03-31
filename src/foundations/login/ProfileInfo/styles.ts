import styled from "styled-components";

export const Container = styled.div`
  height: ${({ theme }) => theme.windowHeight}px;
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
