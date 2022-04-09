import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Container = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  width: 50vw;
  height: 15vh;
  ${FlexCenterStyle};
  ${CS.Box};
  flex-direction: column;

  p {
    margin: 0;
    padding: 0;
  }
`;
