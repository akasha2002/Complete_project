import "./App.css";
import React from "react";
import Login from "./components/login/login";
import ForgotPassword from "./components/forgot_pass/Forgot_pass";
import Wrapper from "./components/dashboard/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Forgot" element={<ForgotPassword />} />
          <Route path="/Student/*" element={<Wrapper />} />
        </Routes>
        {/* <Wrapper></Wrapper> */}
      </BrowserRouter>
    </>
  );
}

export default App;
