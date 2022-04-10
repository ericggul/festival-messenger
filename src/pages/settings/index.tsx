import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import SettingsContainer from "@C/Settings";
import ProfileInfo from "@F/login/ProfileInfo";

function Settings() {
  return (
    <>
      <Header name="Settings" />
      <SettingsContainer />
      <Footer currentLoc="Settings" />
    </>
  );
}

export default withMountEvent(Settings);
