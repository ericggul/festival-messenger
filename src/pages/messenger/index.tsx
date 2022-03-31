import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

function Messenger() {
  return (
    <>
      <Header name="Messenger" />
      <Footer currentLoc="Messenger" />
    </>
  );
}

export default withMountEvent(Messenger);
