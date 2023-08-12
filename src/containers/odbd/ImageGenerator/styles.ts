import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Text = styled.div`
  font-family: Happy;
  font-size: 3.5rem;
  line-height: 4rem;
  text-align: center;
  position: absolute;
  transform: translateY(2rem);
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

export const Title = styled.div`
  position: absolute;
  top: 2rem;
  font-family: Happy;
  font-size: 3.5rem;
  line-height: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Img = styled.div`
  position: absolute;
  animation: none;
  ${FlexCenterStyle};

  flex-direction: column;

  img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
`;
