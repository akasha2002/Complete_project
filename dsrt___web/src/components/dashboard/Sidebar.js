// import React, { useContext } from "react";
// import "./dashboard.css";
// import { Link } from "react-router-dom";
// import { useAuth } from "../Logout/Authlogout";
// import { useUserDetails } from "../Userdetails";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";

// library.add(fas);

// export default function Sidebar(props) {
//   const { handleLogout } = useAuth();
//   const { userType, userName } = useUserDetails();
//   // const { username } = useUserDetails();
//   // console.log("username in sidebar : ",userName, "usertype in sidebar ",userType);
//   return (
//     <>
//       <div className={`bg-white`} id="sidebar-wrapper">
//         <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
//           <FontAwesomeIcon className="me-2" icon="school" />
//           FX School
//         </div>
//         <div className="list-group list-group-flush my-3">
//           {userType === "s" && (
//             <>
//               {/* <Link to="Student_Dashboard" onClick={() => { props.handleLinkClick('Student_Dashboard'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
//                                 <i className="fas fa-project-diagram me-2"></i>Student_Dashboard
//                             </Link> */}
//               <Link
//                 to={{
//                   pathname: "Student_Dashboard",
//                   state: { userName: props.userName }, // Pass userName in the state object
//                 }}
//                 onClick={() => {
//                   props.handleLinkClick("Student_Dashboard");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-project-diagram me-2"></i>Staff_Dashboard
//               </Link>
//               <Link
//                 to="Assigned_work"
//                 onClick={() => {
//                   props.handleLinkClick("Assigned work");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-project-diagram me-2"></i>Assigned work
//               </Link>
//               <Link
//                 to="Completed_work"
//                 onClick={() => {
//                   props.handleLinkClick("Completed work");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-chart-line me-2"></i>Completed work
//               </Link>
//               <Link
//                 to="Reward"
//                 onClick={() => {
//                   props.handleLinkClick("Rewards");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-gift me-2"></i>Rewards
//               </Link>
//             </>
//           )}
//           {userType === "t" && (
//             <>
//               <Link
//                to="Staff_Dashboard"
//                onClick={() => {
//                  props.handleLinkClick("Assign_Work");
//                }}
//                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//                 // to={{
//                 //   pathname: "Staff_Dashboard",
//                 // //  state: { userName: props.userName }, // Pass userName in the state object
//                 // }}
//                 // onClick={(e) => {
//                 //  props.handleLinkClick("Staff_Dashboard");
//                 // // e.preventDefault();
//                 // // navigate(`/Details/Staff_Dashboard`, { state: { props.userName } });
//                 // }}
//                 // className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-project-diagram me-2"></i>Staff_Dashboards
//               </Link>
//               <Link
//                 to="Assign_Work"
//                 onClick={() => {
//                   props.handleLinkClick("Assign_Work");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-chalkboard-teacher me-2"></i>Assign_Work
//               </Link>
//               <Link
//                 to="Assigned_Work"
//                 onClick={() => {
//                   props.handleLinkClick("Assigned_Work");
//                 }}
//                 className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
//               >
//                 <i className="fas fa-chalkboard-teacher me-2"></i>Assigned_Work
//               </Link>
//             </>
//           )}
//           <Link
//             className="list-group-item list-group-item-action bg-transparent text-danger fw-bold cursor-pointer"
//             onClick={handleLogout}
//             style={{ cursor: "pointer" }}
//           >
//             <i className="fas fa-power-off me-2"></i>Logout
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useContext } from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Logout/Authlogout';
import { useUserDetails } from '../Userdetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function Sidebar(props) {
    const { handleLogout } = useAuth();
    const { userType, userName } = useUserDetails();
    // console.log(userType)
    return (
        <>
            <div className={`bg-white`} id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
  <img
    src="https://www.fxschool.ac.in/cs-content/themes/fxcbse/assets/img/FX_LOGO.png"
    alt="FX School Logo"
    className="me-2"
    style={{ width: '180px', height: '50px' }} // Adjust the width and height as needed
  /></div>
                <div className="list-group list-group-flush my-3">
                    {userType === 's' && (
                        <>
                            <Link to="student/Student_Dashboard" onClick={() => { props.handleLinkClick('Student_Dashboard'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-project-diagram me-2"></i>Student_Dashboard
                            </Link>
                            <Link to="student/Student_Assigned_work" onClick={() => { props.handleLinkClick('Assigned work'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-project-diagram me-2"></i>Assigned work
                            </Link>
                            <Link to="student/Student_Completed_work" onClick={() => { props.handleLinkClick('Completed work'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-chart-line me-2"></i>Completed work
                            </Link>
                            <Link to="student/Student_Reward" onClick={() => { props.handleLinkClick('Rewards'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-gift me-2"></i>Rewards
                            </Link>
                        </>
                    )} 
                    {userType === 't' && (
                        <>
                            <Link to="Staff/Staff_Dashboard" onClick={() => { props.handleLinkClick('Staff_Dashboard'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-chalkboard-teacher me-2"></i>Staff_Dashboard
                            </Link>
                            <Link to="Staff/Staff_Assign_Work" onClick={() => { props.handleLinkClick('Assign_Work'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-chalkboard-teacher me-2"></i>Assign_Work
                            </Link>
                            <Link to="Staff/Staff_Assigned_Work" onClick={() => { props.handleLinkClick('Assigned_Work'); }} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                                <i className="fas fa-chalkboard-teacher me-2"></i>Assigned_Work
                            </Link>
                        </>
                    )}
                    <Link className="list-group-item list-group-item-action bg-transparent text-danger fw-bold cursor-pointer" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-power-off me-2"></i>Logout</Link>
                </div>
            </div>
        </>
    )
}
