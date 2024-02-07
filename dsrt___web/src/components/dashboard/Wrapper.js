import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Logout/Authlogout";
import { useUserDetails } from "../Userdetails";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Logout from "./Logout";
import Profile from "../profile/Profile";
import Student_Dashboard from "../student/Student_Dashboard"
import Assigned_work from "../student/assigned_work"
import Completed_work from "../student/completed_work"
import Reward from "../student/reward"
import Staff_Dashboard from "../Staff/Staff_Dashboard"
import Staff_Assign_Work from "../Staff/Staff_Assign_Work"
import Staff_Assigned_Work from "../Staff/Staff_Assigned_Work"

const Wrapper = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state: dashboardUsername } = useLocation();
  const navigate = useNavigate();
  const { handleLogout, showLogoutModal } = useAuth();
  const { userType, userName } = useUserDetails();
  // console.log(userName)
  // console.log(userType)
  // console.log("hi")

  const [currentHeading, setCurrentHeading] = useState('');

useEffect(() => {
  if (userType === 's') {
    setCurrentHeading('Student_Dashboard');
  } else if (userType === 't') {
    setCurrentHeading('Staff_Dashboard');
  }
}, [userType]);

  const handleLinkClick = (heading) => {
    setCurrentHeading(heading);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleProfileClick = () => {
    navigate(`Profile`);
  };

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
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setLoading(false);
      }
    };

    if (userName) {
      fetchUserProfile();
    }
  }, [userName]);

  return (
    <>
      <div className={`d-flex ${isToggled ? "toggled" : ""} ${showLogoutModal ? "blur-background" : ""}`} id="wrapper">
        <Sidebar userType={userType} userName={userName}
          handleLinkClick={handleLinkClick} handleLogout={handleLogout} />
        <div id="page-content-wrapper">
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
          <Routes>
            <Route path="Profile" element={<Profile userType={userType} userName={userName}/>} />
            <Route path="student/Student_Dashboard" element={<Student_Dashboard />} />
            <Route path="student/Student_Completed_work" element={<Completed_work />} />
            <Route path="student/Student_Assigned_work" element={<Assigned_work />} />
            <Route path="student/Student_Reward" element={<Reward />} />
            <Route path="Staff/Staff_Dashboard" element={<Staff_Dashboard userType={userType} userName={userName}/>} />
            <Route path="Staff/Staff_Assign_Work" element={<Staff_Assign_Work userType={userType} userName={userName}/>} />
            <Route path="Staff/Staff_Assigned_Work" element={<Staff_Assigned_Work />} />

          </Routes>
        </div>
      </div>
      <Logout></Logout>
    </>
  );
};

export default Wrapper;