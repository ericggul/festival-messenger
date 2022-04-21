import React, { useState } from "react";
import * as S from "./styles";

//Loading
import LoadingContainer from "@C/Loading";
import MapInner from "@C/map/MapInner";

function MapOuter() {
  const [hideLoading, setHideLoading] = useState(false);

  return (
    <>
      <MapInner hideLoading={() => setHideLoading(true)} />
      {!hideLoading && <LoadingContainer />}
    </>
  );
}
export default MapOuter;
