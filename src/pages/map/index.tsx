import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import MapContainer from "@/containers/map/MapOuter";
import withMountEvent from "@U/hoc/withMountEvent";

function Map() {
  return (
    <>
      <MapContainer />
      {/* <Header name="Map" /> */}

      <Footer currentLoc="Map" />
    </>
  );
}

export default withMountEvent(Map);
