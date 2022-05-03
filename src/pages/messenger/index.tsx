import Header from "@F/layout/Header";
import MessengerContainer from "@C/messenger/Messenger";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";

//helment
import { Helmet } from "react-helmet";

function Messenger() {
  return (
    <>
      <Helmet>
        <title>Messenger</title>

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="버들골에서만 읽을 수 있는 네 마음" />
      </Helmet>
      <Header name="Messenger" />
      <MessengerContainer />
      <Footer currentLoc="Messenger" />
    </>
  );
}

export default withMountEvent(Messenger);
