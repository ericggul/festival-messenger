import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Text = styled.div`
  font-family: Happy;
  font-size: 3.5rem;
  line-height: 4rem;
  text-align: center;
  position: absolute;
  width: 70%;
  height: 80%;

  margin: auto;
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 0.7rem;

  p {
    margin: 0;
  }
`;
