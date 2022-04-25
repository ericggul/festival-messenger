import Header from "@F/layout/Header";
import AboutContainer from "@C/about/About";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

//helment
import { Helmet } from "react-helmet";

function Messenger() {
  return (
    <>
      <Helmet>
        <title>About Festival Messenger</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="About Festival Messenger." />
      </Helmet>
      <Header name="About" />
      <AboutContainer />
      <Footer currentLoc="About" />
    </>
  );
}

export default withMountEvent(Messenger);
