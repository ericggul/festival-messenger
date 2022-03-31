import React from "react";
import useAuth from "@U/hooks/useAuth";
import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import LoginContainer from "@C/Login";

function Login() {
  return (
    <>
      <Header name="Login" />
      <LoginContainer />
      <Footer currentLoc="Login" />
    </>
  );
}
export default withMountEvent(Login);
