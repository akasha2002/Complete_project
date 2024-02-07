import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "../profile/Profile";
import Student_Dashboard from "../student/Student_Dashboard";
import Completed_work from "../student/completed_work";
import Reward from "../student/reward";
import Assigned_work from "../student/assigned_work";
import Staff_Dashboard from "../student/Staff_dashboard";

const Wrapper = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [userData, setUserData] = useState(null);
  const { state: dashboardUsername } = useLocation();
  const navigate = useNavigate();
  console.log(dashboardUsername)
  const [currentHeading, setCurrentHeading] = useState('Dashboard');

    const handleLinkClick = (heading) => {
        setCurrentHeading(heading);
    };

  const handleToggle = () => {
    console.log("Toggle clicked");
    setIsToggled(!isToggled);
  };

  const handleProfileClick = () => {
    navigate(`Profile`, { state: { username: dashboardUsername } });
  };

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/profile/student", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ username: dashboardUsername }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user profile");
  //       }

  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error.message);
  //     }
  //   };

  //   if (dashboardUsername) {
  //     fetchUserProfile();
  //   }

    // console.log('DashboardUsername:', dashboardUsername);
  // }, [dashboardUsername]);

  return (
    <div className={`d-flex ${isToggled ? "toggled" : ""}`} id="wrapper">
      <Sidebar handleLinkClick={handleLinkClick} />
      <div id="page-content-wrapper">
        <Navbar
          userData={userData}
          isToggled={isToggled}
          handleToggle={handleToggle}
          handleLinkClick={handleLinkClick}
          handleProfileClick={handleProfileClick}
          currentHeading={currentHeading}
        />
        <Routes>
          <Route path="Profile" element={<Profile />} />
          <Route path="Dashboard" element={<Student_Dashboard />} />
          <Route path="Completed_work" element={<Completed_work />} />
          <Route path="Reward" element={<Reward />} />
          <Route path="Assigned_work" element={<Assigned_work />} />
          <Route path="Staff_dashboard" element={<Staff_Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Wrapper;
