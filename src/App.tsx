import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withUser from "@U/hoc/withUser";
import useAuth, { useUser } from "@U/hooks/useAuth";
import useModal from "@U/hooks/useModal";
import SignInModal from "@F/modal/content/SignInModal";

function App() {
  const { user, isAuthorized } = useUser();

  const { modalComponent: signInModalComponent, setIsModalOpen } = useModal(SignInModal);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div onClick={() => setIsModalOpen(true)}>{isAuthorized ? "Click to sign out" : "Click to sign in"}</div>
      </header>
      {signInModalComponent}
    </div>
  );
}

export default App;
