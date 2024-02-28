import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/login/login";
import ForgotPassword from "./components/forgot_pass/Forgot_pass";
import { useUserDetails } from "./components/Userdetails";
import Wrapper from "./components/dashboard/Wrapper";

export function AppRoutes() {
  const navigate = useNavigate();
  const { setAndStoreUserName, setAndStoreUserType } = useUserDetails();

  useEffect(() => {
    // Check for existing user authentication details in local storage
    const storedUserName = localStorage.getItem("userName");
    const storedUserType = localStorage.getItem("userType");

    if (storedUserName && storedUserType) {
      // User details exist, perform auto-login
      setAndStoreUserName(storedUserName);
      setAndStoreUserType(storedUserType);

      // Navigate to dashboard based on user type
      switch (storedUserType) {
        case "s":
          navigate("/student/Student_Dashboard");
          break;
        case "t":
          navigate("/Staff/Staff_Dashboard");
          break;
        default:
          console.error("Unknown user type:", storedUserType);
      }
    }
  }, [navigate, setAndStoreUserName, setAndStoreUserType]);

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Forgot" element={<ForgotPassword />} />
      <Route path="*" element={<ConditionalWrapper />} />
    </Routes>
  );
}

function ConditionalWrapper() {
  const { userType } = useUserDetails();

  let WrapperComponent = null;

  if (userType === 's' || userType === 't') {
    WrapperComponent = Wrapper;
  } else {
    // Handle other cases, e.g., render a default component or show an error message
    return <div>User type not recognized</div>;
  }

  return <WrapperComponent />;
}
