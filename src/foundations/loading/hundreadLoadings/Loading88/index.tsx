import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";

import * as S from "./styles";

function Loading() {
  return (
    <S.Container>
      <S.Box>
        <S.InnerBox />
      </S.Box>
    </S.Container>
  );
}
export default Loading;
