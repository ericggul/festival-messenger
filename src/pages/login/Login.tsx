import { useNavigate, useLocation } from "react-router-dom";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import LoginContainer from "@C/Login";

function Login() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <>
      <LoginContainer {...state} />
      <Footer currentLoc="Login" color="rgba(0, 0, 0, 0)" />
    </>
  );
}
export default withMountEvent(Login);
