import Header from "@F/layout/Header";
import withMountEvent from "@U/hoc/withMountEvent";
import { useParams } from "react-router-dom";

function writeMessage() {
  // const params = useParams();

  return (
    <>
      <Header name="Messenger" />
    </>
  );
}

export default withMountEvent(writeMessage);
