import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Logout/Authlogout";
import { useUserDetails } from "../Userdetails";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Logout from "./Logout";
import Profile from "../profile/Profile";
import Student_Dashboard from "../student/Student_Dashboard";
import Assignment_submission from "../student/Assignment_submission";
import Assigned_work from "../student/assigned_work";
import Completed_work from "../student/completed_work";
import Reward from "../student/reward";
import Staff_Dashboard from "../Staff/Staff_Dashboard";
import Staff_Assign_Work from "../Staff/Staff_Assign_Work";
import Staff_Assigned_Work from "../Staff/Staff_Assigned_Work";
import Work_view from "../Staff/work_view";
import Staff_Completed_Work from "../Staff/Staff_Completed_Work";
import Completed_work_view from "../Staff/Completed_work_view";

const Wrapper = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { handleLogout, showLogoutModal } = useAuth();
  const { userType, userName } = useUserDetails();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [currentHeading, setCurrentHeading] = useState('');

  // Mapping of URLs to heading names
  const urlToHeading = {
    "/student/Student_Dashboard": "Student Dashboard",
    "/student/Student_Completed_work": "Completed Work",
    "/student/Student_Assigned_work": "Assigned Work",
    "/student/Assignment_submission": "Assignment Submission",
    "/student/Student_Reward": "Rewards",
    "/Staff/Staff_Dashboard": "Staff Dashboard",
    "/Staff/Staff_Assign_Work": "Assign Work",
    "/Staff/Staff_Assigned_Work": "Assigned Work",
    "/Staff/Staff_work_view": "Work View",
    "/Staff/Staff_Completed_Work": "Completed Work",
    "/Staff/Completed_work_view": "Completed Work View",
    "/Profile": "Profile"
  };

  useEffect(() => {
    const path = location.pathname;
    setCurrentHeading(urlToHeading[path] || '');
  }, [location.pathname]);

  const handleLinkClick = (heading) => {
    setCurrentHeading(heading);
    setIsToggled(false);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleProfileClick = () => {
    navigate(Profile);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("#menu-toggle")
      ) {
        setIsToggled(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/profile/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userName }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile student");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile student :", error.message);
        setLoading(false);
      }
    };

    const fetchUserProfile_2 = async () => {
      try {
        const response = await fetch("http://localhost:3001/profile/staff", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userName }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile student");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile student :", error.message);
        setLoading(false);
      }
    };

    if (userType === 's') {
      fetchUserProfile();
    }
    if (userType === 't') {
      fetchUserProfile_2();
    }
  }, [userName]);

  return (
    <>
      <div className={`d-flex ${isToggled ? "toggled" : ""} ${showLogoutModal ? "blur-background" : ""}`} id="wrapper">
        <Sidebar
          ref={sidebarRef}
          userType={userType}
          userName={userName}
          currentHeading={currentHeading}
          handleLinkClick={handleLinkClick}
          handleLogout={handleLogout}
          setIsToggled={setIsToggled}
        />
        <div id="page-content-wrapper" className={isToggled ? "mobile-sidebar-open" : ""}>
          <Navbar
            userData={userData}
            userName={userName}
            isToggled={isToggled}
            handleToggle={handleToggle}
            handleLinkClick={handleLinkClick}
            handleProfileClick={handleProfileClick}
            currentHeading={currentHeading}
            handleLogout={handleLogout}
          />
          <div className={`container-fluid main-content p-0 ${isToggled ? "toggled" : ""}`}>
            <Routes>
              <Route path="Profile" element={<Profile userType={userType} userName={userName} />} />
              <Route path="student/Student_Dashboard" element={<Student_Dashboard />} />
              <Route path="student/Student_Completed_work" element={<Completed_work />} />
              <Route path="student/Student_Assigned_work" element={<Assigned_work />} />
              <Route path="student/Assignment_submission" element={<Assignment_submission />} />
              <Route path="student/Student_Reward" element={<Reward />} />
              <Route path="Staff/Staff_Dashboard" element={<Staff_Dashboard userType={userType} userName={userName} />} />
              <Route path="Staff/Staff_Assign_Work" element={<Staff_Assign_Work userType={userType} userName={userName} />} />
              <Route path="Staff/Staff_Assigned_Work" element={<Staff_Assigned_Work />} />
              <Route path="Staff/Staff_work_view" element={<Work_view />} />
              <Route path="Staff/Staff_Completed_Work" element={<Staff_Completed_Work />} />
              <Route path="Staff/Completed_work_view" element={<Completed_work_view />} />
            </Routes>
          </div>
        </div>
      </div>
      <Logout />
    </>
  );
};

export default Wrapper;

// import React, { useState, useEffect, useRef } from "react";
// import "./dashboard.css";
// import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../Logout/Authlogout";
// import { useUserDetails } from "../Userdetails";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Logout from "./Logout";
// import Profile from "../profile/Profile";
// import Student_Dashboard from "../student/Student_Dashboard";
// import Assignment_submission from "../student/Assignment_submission";
// import Assigned_work from "../student/assigned_work";
// import Completed_work from "../student/completed_work";
// import Reward from "../student/reward";
// import Staff_Dashboard from "../Staff/Staff_Dashboard";
// import Staff_Assign_Work from "../Staff/Staff_Assign_Work";
// import Staff_Assigned_Work from "../Staff/Staff_Assigned_Work";
// import Work_view from "../Staff/work_view";
// import Staff_Completed_Work from "../Staff/Staff_Completed_Work";
// import Completed_work_view from "../Staff/Completed_work_view";

// const Wrapper = (props) => {
//   const [isToggled, setIsToggled] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { handleLogout, showLogoutModal } = useAuth();
//   const { userType, userName } = useUserDetails();
//   const location = useLocation();
//   const sidebarRef = useRef(null);

//   const [currentHeading, setCurrentHeading] = useState('');

//   useEffect(() => {
//     if (userType === 's') {
//       setCurrentHeading('Student_Dashboard');
//     } else if (userType === 't') {
//       setCurrentHeading('Staff_Dashboard');
//     }
//   }, [userType]);

//   const handleLinkClick = (heading) => {
//     setCurrentHeading(heading);
//     setIsToggled(false);
//   };

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//   };

//   const handleProfileClick = () => {
//     navigate(`Profile`);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         !event.target.closest("#menu-toggle")
//       ) {
//         setIsToggled(false);
//       }
//     };
  
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("touchstart", handleClickOutside);
  
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/profile/student", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username: userName }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile student");
//         }

//         const data = await response.json();
//         setUserData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user profile student :", error.message);
//         setLoading(false);
//       }
//     };

//     const fetchUserProfile_2 = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/profile/staff", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username: userName }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile student");
//         }

//         const data = await response.json();
//         setUserData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user profile student :", error.message);
//         setLoading(false);
//       }
//     };

//     if (userType === 's') {
//       fetchUserProfile();
//     }
//     if (userType === 't') {
//       fetchUserProfile_2();
//     }
//   }, [userName]);

//   return (
//     <>
//       <div className={`d-flex ${isToggled ? "toggled" : ""} ${showLogoutModal ? "blur-background" : ""}`} id="wrapper">
//         <Sidebar
//           ref={sidebarRef}
//           userType={userType}
//           userName={userName}
//           handleLinkClick={handleLinkClick}
//           handleLogout={handleLogout}
//         />
//         <div id="page-content-wrapper" className={isToggled ? "mobile-sidebar-open" : ""}>
//           <Navbar
//             userData={userData}
//             userName={userName}
//             isToggled={isToggled}
//             handleToggle={handleToggle}
//             handleLinkClick={handleLinkClick}
//             handleProfileClick={handleProfileClick}
//             currentHeading={currentHeading}
//             handleLogout={handleLogout}
//           />
//           <div className={`container-fluid ${isToggled ? "toggled" : ""}`}>
//             <Routes>
//               <Route path="Profile" element={<Profile userType={userType} userName={userName} />} />
//               <Route path="student/Student_Dashboard" element={<Student_Dashboard />} />
//               <Route path="student/Student_Completed_work" element={<Completed_work />} />
//               <Route path="student/Student_Assigned_work" element={<Assigned_work />} />
//               <Route path="student/Assignment_submission" element={<Assignment_submission />} />
//               <Route path="student/Student_Reward" element={<Reward />} />
//               <Route path="Staff/Staff_Dashboard" element={<Staff_Dashboard userType={userType} userName={userName} />} />
//               <Route path="Staff/Staff_Assign_Work" element={<Staff_Assign_Work userType={userType} userName={userName} />} />
//               <Route path="Staff/Staff_Assigned_Work" element={<Staff_Assigned_Work />} />
//               <Route path="Staff/Staff_work_view" element={<Work_view />} />
//               <Route path="Staff/Staff_Completed_Work" element={<Staff_Completed_Work />} />
//               <Route path="Staff/Completed_work_view" element={<Completed_work_view />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//       <Logout />
//     </>
//   );
// };

// export default Wrapper;
