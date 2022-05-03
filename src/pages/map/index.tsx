import Footer from "@F/layout/Footer";
import MapContainer from "@/containers/map/MapOuter";
import { useLocation } from "react-router-dom";
import withMountEvent from "@U/hoc/withMountEvent";

//helment
import { Helmet } from "react-helmet";

function Map() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <>
      <Helmet>
        <title>Messenger Map</title>
        <meta name="description" content="버들골에서만 읽을 수 있는 네 마음" />
      </Helmet>
      <MapContainer {...state} />
      <Footer currentLoc="Map" />
    </>
  );
}

export default withMountEvent(Map);
