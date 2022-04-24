import { useLocation } from "react-router-dom";
import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import LoginContainer from "@C/Login";

function Login() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <>
      <Header name="Login" />
      <LoginContainer {...state} />
      <Footer currentLoc="Login" color="rgba(0, 0, 0, 0)" />
    </>
  );
}
export default withMountEvent(Login);
