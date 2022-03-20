import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withUser from "@U/hoc/withUser";
import useAuth from "@U/hooks/useAuth";

function App() {
  const { signIn } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div onClick={signIn}>{Math.random() < 0.4 ? "Click to sign out" : "Click to sign in"}</div>
      </header>
    </div>
  );
}

export default App;
