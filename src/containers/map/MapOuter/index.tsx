import React, { useState } from "react";
import * as S from "./styles";

//Loading
import LoadingContainer from "@C/Loading";
import MapInner from "@C/map/MapInner";

function MapOuter(props: any) {
  const [hideLoading, setHideLoading] = useState(false);

  return (
    <>
      <MapInner hideLoading={() => setHideLoading(true)} {...props} />
      {!hideLoading && <LoadingContainer />}
    </>
  );
}
export default MapOuter;
