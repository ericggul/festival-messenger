import Header from "@F/layout/Header";
import { useState } from "react";
import WriteMessageContainer from "@C/writeMessage/WriteMessage";
import PreviewMessageContainer from "@C/writeMessage/PreviewMessage";
import withMountEvent from "@U/hoc/withMountEvent";

import { useNavigate, useLocation } from "react-router-dom";

import * as CS from "@S/style/common/errorPage";

function WriteMessage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const [imageFile, setImageFile] = useState<any>(null);
  const [musicFile, setMusicFile] = useState<any>(null);
  const [previewState, setPreviewState] = useState(false);
  return (
    <>
      {state ? (
        <>
          {previewState ? (
            <PreviewMessageContainer moveBackToWriteMode={() => setPreviewState(false)} imageFile={imageFile} musicFile={musicFile} />
          ) : (
            <WriteMessageContainer
              {...state}
              moveToPreview={(img: any, mz: any) => {
                setImageFile(img);
                setMusicFile(mz);
                setPreviewState(true);
              }}
              imageFile={imageFile}
              musicFile={musicFile}
            />
          )}
        </>
      ) : (
        <CS.Container>
          <CS.Text>Wrong Access!</CS.Text>
          <CS.ToMainButton onClick={() => navigate("/map")}>Go back to main</CS.ToMainButton>
        </CS.Container>
      )}
    </>
  );
}

export default withMountEvent(WriteMessage);
