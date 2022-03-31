import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

function Settings() {
  return (
    <>
      <Header name="Settings" />
      <Footer currentLoc="Settings" />
    </>
  );
}

export default withMountEvent(Settings);
