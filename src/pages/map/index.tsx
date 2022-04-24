import Footer from "@F/layout/Footer";
import MapContainer from "@/containers/map/MapOuter";
import { useLocation } from "react-router-dom";
import withMountEvent from "@U/hoc/withMountEvent";

function Map() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <>
      <MapContainer {...state} />
      <Footer currentLoc="Map" />
    </>
  );
}

export default withMountEvent(Map);
