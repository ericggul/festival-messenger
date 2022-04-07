import Header from "@F/layout/Header";
import MessengerContainer from "@C/messenger/Messenger";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

function Messenger() {
  return (
    <>
      <Header name="Messenger" />
      <MessengerContainer />
      <Footer currentLoc="Messenger" />
    </>
  );
}

export default withMountEvent(Messenger);
