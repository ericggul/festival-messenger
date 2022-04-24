import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import SettingsContainer from "@C/Settings";

import { useLocation } from "react-router-dom";

function Settings() {
  const location = useLocation();
  const state = location.state as any;
  return (
    <>
      <Header name="Settings" color="transparent" />
      <SettingsContainer {...state} />
      <Footer currentLoc="Settings" />
    </>
  );
}

export default withMountEvent(Settings);
