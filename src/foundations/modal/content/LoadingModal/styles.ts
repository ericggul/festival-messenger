import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Container = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  height: 15vh;
  padding: 0 2rem;
  ${FlexCenterStyle};
  ${CS.Box};
  flex-direction: column;

  p {
    margin: 0;
    padding: 0;
  }
`;
