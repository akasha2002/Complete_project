import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Logout/Authlogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";
library.add(fas);


// library.add(fas);

export default function Navbar(props) {
  const { handleLogout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767); // Check if the initial width is desktop
  const [userData, setuserData] = useState(null);

  const { state } = useLocation();
  const { userType, userName } = useUserDetails();

  useEffect(() => {
    const updateWindowSize = () => {
      setIsDesktop(window.innerWidth > 767);
    };

    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time to 12-hour format with AM/PM and seconds
  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          // "http://192.168.1.2:3001/profile/student",
          "http://localhost:3001/profile/student",

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setuserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };
    const fetchUserProfile_2 = async () => {
      // console.log("In wrapper teacher in profile",userName ,userType)
      // var response = 0
      try {
        // if(userType === 's'){
        //const response = await fetch("http://192.168.1.2:3001/profile/staff", {
        const response = await fetch("http://localhost:3001/profile/staff", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userName }),
        });
        // }
        // if(userType === 't'){
        //   const response = await fetch("http://localhost:3001/profile/student", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ username: userName }),
        // });
        // }

        if (!response.ok) {
          throw new Error("Failed to fetch user profile student");
        }

        const data = await response.json();
        setuserData(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile student :", error.message);
        // setLoading(false);
      }
    };

    if (userType === "s") {
      fetchUserProfile();
    }
    if (userType === "t") {
      fetchUserProfile_2();
    }
  }, [userName]);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-custom py-2 px-2">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <i
              className="fas fa-align-left primary-text fs-5 me-3" style={{ color: "white" }}
              onClick={props.handleToggle}
              id="menu-toggle"
            ></i>
            <h2 className="fs-5 m-0" style={{ color: "white" }}>
              {props.currentHeading}
            </h2>
          </div>
          <div className="ms-auto d-flex align-items-center">
            {isDesktop && ( // Render time only if it's a desktop view
              <div className="me-3" style={{ color: 'white', fontSize: '1.5rem' }}>{formatTime(currentTime)}</div>
            )}
            <div
              className="nav-link dropdown-toggle second-text fw-bold pr-custom no-arrow"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={`http://localhost:3001/avatars/${userData?.image_link}`}
                alt="Avatar"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
                />


            </div>
            <ul
              className="dropdown-menu dropdown-menu-end"
              style={{ cursor: "pointer" }}
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link to="/Profile" className="dropdown-item">
                  <FontAwesomeIcon className="me-2" icon="user" />
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" onClick={handleLogout}>
                  <FontAwesomeIcon className="me-2" icon="sign-out" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
