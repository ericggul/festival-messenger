import React, { Suspense, useMemo, useState, useEffect } from "react";
import * as S from "./styles";

//foundations

import Loading59 from "@F/loading/hundreadLoadings/Loading59";

function Loading({ show }: any) {
  const [dismount, setDismount] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (!show) {
      timeout = setTimeout(() => {
        setDismount(true);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <S.Container
      style={{
        opacity: show ? 1 : 0,
      }}
    >
      {!dismount && (
        <Suspense fallback={null}>
          <Loading59 />
        </Suspense>
      )}
    </S.Container>
  );
}
export default Loading;
