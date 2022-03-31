import React from "react";
import useAuth from "@U/hooks/useAuth";
import Header from "@F/layout/Header";
import Footer from "@F/layout/Footer";
import withMountEvent from "@U/hoc/withMountEvent";
import ProfileInfo from "@F/login/ProfileInfo";

function Login() {
  return (
    <>
      <Header name="Map" />
      <Footer currentLoc="Map" />
      <ProfileInfo />
    </>
  );
}
export default withMountEvent(Login);
