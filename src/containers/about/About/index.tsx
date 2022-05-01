import React from "react";
import * as S from "./styles";

import UpperSection from "@C/about/UpperSection";
import MiddleSection from "@C/about/MiddleSection";

function About() {
  return (
    <S.Background>
      <UpperSection />
      <MiddleSection />
    </S.Background>
  );
}
export default About;
