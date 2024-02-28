// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../Userdetails";
// import Cookies from "js-cookie";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const { setAndStoreUserName, setAndStoreUserType } = useUser();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result.success) {
//           const { userType, userName } = result;

//           const userToken = "yourTokenHere"; // Replace 'yourTokenHere' with the actual token received from the server
//           Cookies.set("token", userToken, { expires: 7 });

//           setAndStoreUserName(userName);
//           setAndStoreUserType(userType);

//           switch (userType) {
//             case "s":
//               navigate("/student/Student_Dashboard", { state: { username } });
//               break;
//             case "t":
//               navigate("/Staff/Staff_Dashboard");
//               break;
//             default:
//               console.error("Unknown user type:", userType);
//               break;
//           }
//         } else {
//           setLoginError("Invalid username or password");
//         }
//       } else {
//         console.error("Login failed:", response.statusText);
//         setLoginError("Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setLoginError("Error during login");
//     }
//   };

//   return (
//     <div className="bg-lightblue min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#35aaf3" }}>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card mt-3 mb-3 p-0">
//               <div className="card-header" style={{ backgroundColor: "#0082c8", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <img src="favicon.png" alt="School Logo" style={{ width: "60px", height: "50px", marginRight: "0px" }} />
//                 <h3 className="text-center text-white mb-0">Login | FX School</h3>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleLogin}>
//                   <div className="mb-3">
//                     <label htmlFor="username" className="form-label">Username</label>
//                     <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                   </div>
//                   <div className="d-grid">
//                     <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0082c8" }}>Login</button>
//                   </div>
//                 </form>
//                 {loginError && <p className="text-danger mt-3">{loginError}</p>}
//                 <div className="text-center mt-3">
//                   <Link to="/forgot" className="link-secondary">Forgot Password?</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Userdetails";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Use the useUser hook to get access to context values
  const { setAndStoreUserName, setAndStoreUserType } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://192.168.1.2:3001/login', {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          const { userType, userName } = result;


          // Cookies.set("userType", userType, { expires: 7 });
          // Cookies.set("userName", userName, { expires: 7 });

          
          setAndStoreUserName(userName);
          setAndStoreUserType(userType);

          switch (userType) {
            case "s":
              navigate("/student/Student_Dashboard", { state: { username } });
              break;
            case "t":
              navigate("/Staff/Staff_Dashboard");
              break;
            default:
              console.error("Unknown user type:", userType);
              break;
          }
        } else {
          setLoginError("Invalid username or password");
        }
      } else {
        console.error("Login failed:", response.statusText);
        setLoginError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Error during login");
    }
  };

  return (
    <div
      className="bg-lightblue min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#35aaf3" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-3 mb-3 p-0">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#0082c8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="favicon.png"
                  alt="School Logo"
                  style={{ width: "60px", height: "50px", marginRight: "0px" }}
                />
                <h3 className="text-center text-white mb-0">
                  Login | FX School
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#0082c8" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                {loginError && <p className="text-danger mt-3">{loginError}</p>}
                <div className="text-center mt-3">
                  <Link to="/Forgot" className="link-secondary">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
