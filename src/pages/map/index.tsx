import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

function Map() {
  return (
    <>
      <Header name="Map" />
      <Footer currentLoc="Map" />
    </>
  );
}

export default withMountEvent(Map);
