import { useLocation } from "react-router-dom";
import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import LoginContainer from "@C/Login";

//helment
import { Helmet } from "react-helmet";

function Login() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Header name="Login" />
      <LoginContainer {...state} />
      <Footer currentLoc="Login" color="transparent" />
    </>
  );
}
export default withMountEvent(Login);
