import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import ProfileInfo from "@F/login/ProfileInfo";

function Settings() {
  return (
    <>
      <Header name="Settings" />
      <ProfileInfo />
      <Footer currentLoc="Settings" />
    </>
  );
}

export default withMountEvent(Settings);
