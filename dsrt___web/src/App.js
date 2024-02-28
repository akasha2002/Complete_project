// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import React, { useEffect } from "react";
// import Login from "./components/login/login";
// import ForgotPassword from "./components/forgot_pass/Forgot_pass";
// import { Authlogout } from "./components/Logout/Authlogout";
// import { UserProvider, useUserDetails } from "./components/Userdetails";
// import Wrapper from "./components/dashboard/Wrapper";
// import Cookies from "js-cookie";


// function App() {
//   return (
//     <Router>
//       <UserProvider>
//         <Authlogout>
//           <Routes>
//             <Route path="/" element={<AppRoutes />} />
//           </Routes>
//         </Authlogout>
//       </UserProvider>
//     </Router>
//   );
// }

// function AppRoutes() {
//   const navigate = useNavigate();
//   const { setAndStoreUserName, setAndStoreUserType } = useUserDetails();

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       // Perform auto-login logic here
//       try {
//         // Decode the token to retrieve user information
//         const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
//         const { userName, userType } = decodedToken;

//         // Set user details in the application state or context
//         setAndStoreUserName(userName);
//         setAndStoreUserType(userType);

//         // Redirect the user to the appropriate dashboard based on userType
//         switch (userType) {
//           case "s":
//             navigate("/student/Student_Dashboard");
//             break;
//           case "t":
//             navigate("/staff/Staff_Dashboard");
//             break;
//           default:
//             console.error("Unknown user type:", userType);
//             break;
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         // Handle token decoding error (e.g., invalid token format)
//       }
//     }
//   }, [navigate, setAndStoreUserName, setAndStoreUserType]);

//   return (
//     <Routes>
//       <Route exact path="/" element={<Login />} />
//       <Route exact path="/Forgot" element={<ForgotPassword />} />
//       <Route path="/*" element={<ConditionalWrapper />} />
//     </Routes>
//   );
// }

// function ConditionalWrapper() {
//   const { userType } = useUserDetails();

//   let WrapperComponent = null;

//   if (userType === 's') {
//     WrapperComponent = Wrapper;
//   } else if (userType === 't') {
//     WrapperComponent = Wrapper;
//   } else {
//     // Handle other cases, e.g., render a default component or show an error message
//     return <div>User type not recognized</div>;
//   }

//   return <WrapperComponent />;
// }

// export default App;







// .......................
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

// import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Login from "./components/login/login";
// import ForgotPassword from "./components/forgot_pass/Forgot_pass";
// import { Authlogout } from "./components/Logout/Authlogout";
// import { UserProvider, useUserDetails } from "./components/Userdetails";
// import Wrapper from "./components/dashboard/Wrapper";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <UserProvider>
//           <Authlogout>
//             <AppRoutes />
//           </Authlogout>
//         </UserProvider>
//       </BrowserRouter>
//     </>
//   );
// }

// function AppRoutes() {
//   const navigate = useNavigate();
//   const { setAndStoreUserName, setAndStoreUserType, userType } = useUserDetails();

//   useEffect(() => {
//     // Check for existing user authentication details in local storage
//     const storedUserName = localStorage.getItem("userName");
//     const storedUserType = localStorage.getItem("userType");

//     if (storedUserName && storedUserType && !userType) {
//       // User details exist but userType is not set in context yet
//       // Perform auto-login and set userType
//       setAndStoreUserName(storedUserName);
//       setAndStoreUserType(storedUserType);
//     }
//   }, [setAndStoreUserName, setAndStoreUserType, userType]);

//   if (userType === "s" || userType === "t") {
//     // User is authenticated, render the appropriate dashboard
//     return <Wrapper />;
//   }

//   return (
//     <Routes>
//       <Route exact path="/" element={<Login />} />
//       <Route exact path="/Forgot" element={<ForgotPassword />} />
//     </Routes>
//   );
// }

// export default App;

