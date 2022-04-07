import Header from "@F/layout/Header";
import { useState } from "react";
import WriteMessageContainer from "@C/writeMessage/WriteMessage";
import PreviewMessageContainer from "@C/writeMessage/PreviewMessage";
import withMountEvent from "@U/hoc/withMountEvent";

import { useLocation } from "react-router-dom";

function WriteMessage() {
  const location = useLocation();
  const state = location.state as any;
  const [previewState, setPreviewState] = useState(false);
  return (
    <>
      {state ? (
        <>{previewState ? <PreviewMessageContainer moveBackToWriteMode={() => setPreviewState(false)} /> : <WriteMessageContainer {...state} moveToPreview={() => setPreviewState(true)} />}</>
      ) : (
        <div>Wrong Access!</div>
      )}
    </>
  );
}

export default withMountEvent(WriteMessage);
