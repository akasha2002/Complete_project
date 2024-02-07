import "./App.css";
import React from "react";
import Login from "./components/login/login";
import ForgotPassword from "./components/forgot_pass/Forgot_pass";
import { Authlogout } from "./components/Logout/Authlogout";
import { UserProvider, useUserDetails } from "./components/Userdetails";
import Wrapper from "./components/dashboard/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Authlogout>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Forgot" element={<ForgotPassword />} />
              <Route path="/*" element={<ConditionalWrapper />} />
            </Routes>
          </Authlogout>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

function ConditionalWrapper() {
  const { userType } = useUserDetails();

  let WrapperComponent = null;

  if (userType === 's') {
    WrapperComponent = Wrapper;
  } else if (userType === 't') {
    WrapperComponent = Wrapper;
  } else {
    // Handle other cases, e.g., render a default component or show an error message
    return <div>User type not recognized</div>;
  }

  return <WrapperComponent />;
}

export default App;