import Header from "@F/layout/Header";
import WriteMessageContainer from "@C/writeMessage/WriteMessage";
import withMountEvent from "@U/hoc/withMountEvent";

import { useLocation } from "react-router-dom";

function WriteMessage() {
  const location = useLocation();

  const state = location.state as any;

  return (
    <>
      <Header name={`Send Message`} />

      {state ? <WriteMessageContainer {...state} /> : <div>Wrong Access!</div>}
    </>
  );
}

export default withMountEvent(WriteMessage);
