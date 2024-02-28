import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../Userdetails";

export default function Completed_work() {


  const { userType, userName } = useUserDetails();
  // console.log(Username)
  const [recentAssignments, setRecentAssignments] = useState([]);
  // const [finalId, setFinalId] = useState(null);

  const navigate = useNavigate();

  // const handlesubmissionClick = () => {
  //     navigate('/student/Assignment_submission');
  // };
  const handlesubmissionClick = (id, status) => {
    // console.log(id)
    //  navigate(`/student/Assignment_submission?id=${id}`);
    console.log(status);
    if (status == "Work Assigned") {
      navigate(`/student/Assignment_submission`, { state: { id } });
    }
    if (status == "Work completed") {
      navigate(`/student/Student_Completed_work`, { state: { id } });
    }
  };

  useEffect(() => {
    // Fetch data from the API with the username included in the request
    // console.log("Inside use effect",userName);
    if (userName) {
      fetch("http://localhost:3001/student/completed_work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: userName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // console.log("response",response.json())
          return response.json();
        })

        .then((data) => {
          // Handle the response data
          const assignments = data.rows_10[0].map((row, index) => {
            // Extract assignment details from each row
            return {
              id: index + 1, // Assign auto-incrementing ID
              assign_id: row.Auto_increment,
              teacher: row.teacher_name,
              subject: row.subjects,
              assignment: row.assignment_title,
              status: row.assignment_status,
              dueDate: row.due_date,
              assign_time: row.teacher_ass_post_time,
              completed_time: row.student_submit_time,
              rewards: row.rewards,
            };
            // console.log(assignments)
          });
          // Update state with data including auto-incrementing IDs
          setRecentAssignments(assignments);
          // setFinalId(assignments.length);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching recent assignments:", error);
        });
      // console.log("Outside use effect",userName);
    }
  }, []);

  // console.log(recentAssignments);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-5">
          <h3 className="fs-4 mb-3">Recent Assignments</h3>
          <div className="col">
            <div className="table-responsive">
              <table className="table bg-white rounded shadow-sm table-hover" style={{'cursor': 'pointer'}}>
                <thead>
                  <tr>
                    <th scope="col" width="50">
                      #
                    </th>
                    <th scope="col">Subject</th>
                    <th>Assignment</th>
                    {/* <th scope="col">Status</th> */}
                    <th scope="col">Teacher</th>
                    <th scope="col">Assigned Time</th>
                    <th scope="col">Completed Time</th>
                    <th scope="col">Due Date</th>
                    {recentAssignments.some(
                      (assignment) => assignment.rewards > 0
                    ) ? (
                      <th scope="col">Marks</th>
                    ) : null}
                  </tr>
                </thead>

                <tbody>
                  {recentAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      onClick={() =>
                        handlesubmissionClick(
                          assignment.assign_id,
                          assignment.status
                        )
                      }
                    >
                      <th scope="row">{assignment.id}</th>
                      <td>{assignment.subject}</td>
                      <td>{assignment.assignment}</td>
                      {/* <td>{assignment.status}</td> */}
                      <td>{assignment.teacher}</td>
                      <td>{assignment.assign_time}</td>
                      <td>{assignment.completed_time}</td>
                      <td>{assignment.dueDate}</td>
                      {assignment.rewards > 0 && (
                        <td>{assignment.rewards}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //     <>
  //         <div className="container-fluid px-4">
  //             <div className="row g-3 my-2">
  //                 {/* Customize additional sections or components specific to the Completed Work page */}
  //                 <div className="col-md-6">
  //                     <div className="p-3 bg-light shadow-sm rounded">
  //                         <h3 className="fs-4 mb-3">Your Completed Assignments</h3>
  //                         <p className="fs-6">Check the list of assignments you have successfully completed.</p>
  //                     </div>
  //                 </div>
  //                 {/* Add more sections as needed */}
  //             </div>
  //             <div className="row my-5">
  //                 <h3 className="fs-4 mb-3">Completed Assignments</h3>
  //                 <div className="col">
  //                     <table className="table bg-white rounded shadow-sm table-hover">
  //                         <thead>
  //                             <tr>
  //                                 <th scope="col">#</th>
  //                                 <th scope="col">Subject</th>
  //                                 <th scope="col">Assignment</th>
  //                                 <th scope="col">Completion Date</th>
  //                             </tr>
  //                         </thead>
  //                         <tbody>
  //                             {completedAssignments.map((assignment) => (
  //                                 <tr key={assignment.id}>
  //                                     <th scope="row">{assignment.id}</th>
  //                                     <td>{assignment.subject}</td>
  //                                     <td>{assignment.assignment}</td>
  //                                     <td>{assignment.completionDate}</td>
  //                                 </tr>
  //                             ))}
  //                         </tbody>
  //                     </table>
  //                 </div>
  //             </div>
  //         </div>
  //     </>
  // );
}
