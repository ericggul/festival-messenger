import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 3.7rem;

  animation: ${AppearAnimation} 0.3s;
`;
