import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import * as S from "./styles";

function Loading() {
  return (
    <S.Container>
      <S.Text>Loading</S.Text>
    </S.Container>
  );
}
export default Loading;
