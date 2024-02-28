

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useUserDetails } from "../Userdetails";

// const Profile = () => {
//   const { state } = useLocation();
//   const { userType, userName } = useUserDetails();
//   const [userData, setUserData] = useState(null);
//   const [userData_student, setUserData_student] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/profile/student",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username: userName }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile");
//         }

//         const data = await response.json();
//         setUserData(data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error.message);
//       }
//     };

//     const fetchUserProfile_2 = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/profile/staff",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username: userName }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile staff");
//         }

//         const data = await response.json();
//         setUserData(data);
//       } catch (error) {
//         console.error("Error fetching user profile staff:", error.message);
//       }
//     };

//     const fetchUserProfile_3 = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/profile/student/subjects",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ student_id_param: userName }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile student subjects");
//         }

//         const data = await response.json();
//         setUserData_student(data);
//       } catch (error) {
//         console.error(
//           "Error fetching user profile student subjects:",
//           error.message
//         );
//       }
//     };

//     // Call the appropriate fetch function based on userType
//     if (userType === "s") {
//       fetchUserProfile();
//       fetchUserProfile_3();
//     } else if (userType === "t") {
//       fetchUserProfile_2();
//     }
//   }, [userName, userType]);

//   return (
//     <>
//       <section>
//         <div className="container-fluid my-4">
//           <div className="row justify-content-center align-items-center">
//             {/* Your existing code for user profile details */}
//             <div className="col-lg-12" style={{ width: "98%" }}>
//               <div className="card mb-4">
//                 <div className="card-body text-center">
//                   <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row">
//                     <img
//                       src={`http://localhost:3001/avatars/${userData?.image_link}`}
//                       alt="avatarrr"
//                       className="rounded-circle img-fluid mb-3 mb-lg-0 ms-lg-5 me-3 me-lg-0"
//                       style={{
//                         minWidth: "10%",
//                         width: "100%",
//                         maxWidth: "100px",
//                       }}
//                     />
//                     <div className="flex-grow-1">
//                       <div className="my-3">
//                         {userName ? (
//                           <h2>Welcome, {userData?.name}!</h2>
//                         ) : (
//                           <p>No username available</p>
//                         )}
//                       </div>
//                       <p className="text-muted mb-1">{userData?.designation}</p>
//                       <p className="text-muted mb-0">{userData?.email}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="card mb-4 mb-md-0">
//                   <div className="card-body">
//                     <p className="mb-4">
//                       <span className="text-primary font-italic me-1">
//                         Personal Details
//                       </span>
//                     </p>
//                     {/* Personal details */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="card mb-4 mb-md-4">
//                   <div className="card-body">
//                     <p className="mb-4">
//                       <span className="text-primary font-italic me-1">
//                         Academic Details
//                       </span>
//                     </p>
//                     {userType === "s" && (
//                       /* Render student academic details here */
//                       <p>
//                         <div className="row">
//                       <div className="col-sm-3">
//                         <p className="mb-0">Standard</p>
//                       </div>
//                       <div className="col-sm-9">
//                         <p className="text-muted mb-0">
//                           {userData?.address_student_door_no},
//                           {userData?.address_student_street},
//                           {userData?.address_student_district},
//                           {userData?.address_student_state}
//                         </p>
//                       </div>
//                     </div>

//                       </p>
                      
                      
//                     )}
//                     {userType === "t" && (
//                       /* Render staff academic details here */
//                       <p>Render staff academic details here</p>
//                     )}
//                   </div>
//                 </div>
//                 {userData_student && (
//                   <section>
//                     <div className="container-fluid my-4">
//                       <div className="row justify-content-center align-items-center">
//                         <div className="col-md-12">
//                           <div className="card mb-4 mb-md-4">
//                             <div className="card-body">
//                               <p className="mb-4">
//                                 <span className="text-primary font-italic me-1">
//                                   Rewards Points
//                                 </span>
//                               </p>
//                               <hr></hr>
//                               {userData_student.users.map((user, index) => (
//                                 <div className="row" key={index}>
//                                   {/* <div className="col-sm-3">
//                           <p className="mb-0">{user.subjects}</p>
//                         </div> */}
//                                   <div className="col-sm-9">
//                                     <p className="text-muted mb-0">
//                                       {user.subjects}:{" "}
//                                       {user.subject_rewards || "0"}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

     
//     </>
//   );

// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";

const Profile = () => {
  const { state } = useLocation();
  const { userType, userName } = useUserDetails();
  const [userData, setUserData] = useState(null);
  const [userData_student, setUserData_student] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
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
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    const fetchUserProfile_2 = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/profile/staff",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile staff");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile staff:", error.message);
      }
    };

    const fetchUserProfile_3 = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/profile/student/subjects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ student_id_param: userName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile student subjects");
        }

        const data = await response.json();
        setUserData_student(data);
      } catch (error) {
        console.error(
          "Error fetching user profile student subjects:",
          error.message
        );
      }
    };

    // Call the appropriate fetch function based on userType
    if (userType === "s") {
      fetchUserProfile();
      fetchUserProfile_3();
    } else if (userType === "t") {
      fetchUserProfile_2();
    }
  }, [userName, userType]);

  return (
    <>
      <section>
        <div className="container-fluid my-4">
          <div className="row justify-content-center align-items-center">
            {/* Your existing code for user profile details */}
            <div className="col-lg-12" style={{ width: "98%" }}>
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row">
                    {/* <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="Avatar"
                      className="rounded-circle img-fluid mb-3 mb-lg-0 ms-lg-5 me-3 me-lg-0"
                      style={{ minWidth: "10%", width: "100%", maxWidth: "100px" }}
                    /> */}

                    <img
                      src={`http://localhost:3001/avatars/${userData?.image_link}`}
                      alt="avatarrr"
                      className="rounded-circle img-fluid mb-3 mb-lg-0 ms-lg-5 me-3 me-lg-0"
                      style={{
                        minWidth: "10%",
                        width: "100%",
                        maxWidth: "100px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="my-3">
                        {userName ? (
                          <h2>Welcome, {userData?.name}!</h2>
                        ) : (
                          <p>No username available</p>
                        )}
                      </div>
                      <p className="text-muted mb-1">{userData?.designation}</p>
                      <p className="text-muted mb-0">{userData?.email}</p>
                    </div>
                    {/* <div className="flex-grow-1">
                      <p>Your Gmail</p>
                    </div>
                    <div className="flex-grow-1">
                      <p>Your phone number</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* '''' */}
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Personal Details
                      </span>
                    </p>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Date Of Birth</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.dob}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Blood Group</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.blood_group}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Gender</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.gender}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Caste</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.caste}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Religion</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.religion}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userData?.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Father's Mobile Number</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.fathers_mobile_no}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mother's Mobile Number</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.mothers_mobile_no}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Communication Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.c_addressdoor_no},
                          {userData?.c_address_street},
                          {userData?.c_address_district},
                          {userData?.address_student_state}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Permanent Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.p_addressdoor_no},
                          {userData?.p_address_street},
                          {userData?.p_address_district},
                          {userData?.p_address_state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-4">
                  <div className="card-body">
                    <p className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Academic Details
                      </span>{" "}
                    </p>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Standard</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.address_student_door_no},
                          {userData?.address_student_street},
                          {userData?.address_student_district},
                          {userData?.address_student_state}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Batch</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.address_student_door_no},
                          {userData?.address_student_street},
                          {userData?.address_student_district},
                          {userData?.address_student_state}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Status</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.address_student_door_no},
                          {userData?.address_student_street},
                          {userData?.address_student_district},
                          {userData?.address_student_state}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Current Subjects</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {userData?.address_student_door_no},
                          {userData?.address_student_street},
                          {userData?.address_student_district},
                          {userData?.address_student_state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {userData_student && (
                  <section>
                    <div className="container-fluid my-4">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-md-12">
                          <div className="card mb-4 mb-md-4">
                            <div className="card-body">
                              <p className="mb-4">
                                <span className="text-primary font-italic me-1">
                                  Rewards Points
                                </span>
                              </p>
                              <hr></hr>
                              {userData_student.users.map((user, index) => (
                                <div className="row" key={index}>
                                  {/* <div className="col-sm-3">
                          <p className="mb-0">{user.subjects}</p>
                        </div> */}
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {user.subjects}:{" "}
                                      {user.subject_rewards || "0"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render subjects and rewards dynamically */}
    </>
  );
};

export default Profile;
