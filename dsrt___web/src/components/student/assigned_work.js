import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from "../Userdetails";
import axios from 'axios';
export default function Assigned_work() {
  const { userType, userName } = useUserDetails();
  // console.log(Username)
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [finalId, setFinalId] = useState(null);

  const navigate = useNavigate();

  // const handlesubmissionClick = () => {
  //     navigate('/student/Assignment_submission');
  // };
  const handlesubmissionClick = (id, status) => {
    // console.log(id)
    //  navigate(`/student/Assignment_submission?id=${id}`);
    console.log(status)
    if (status == 'Work Assigned') {
      navigate(`/student/Assignment_submission`, { state: { id } });
    }
    if (status == 'Work completed') {
      navigate(`/student/Student_Completed_work`, { state: { id } });
    }
  };

  useEffect(() => {
    // Fetch data from the API with the username included in the request
    // console.log("Inside use effect",userName);
    if (userName) {
      fetch("http://localhost:3001/student/student_dashboard", {
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
          const assignments = data.rows_4[0].map((row, index) => {
            // Extract assignment details from each row
            return {
              id: index + 1, // Assign auto-incrementing ID
              assign_id: row.Auto_increment,
              teacher: row.teacher_name,
              subject: row.subjects,
              assignment: row.assignment_title,
              status: row.assignment_status,
              dueDate: row.due_date,
              assign_time: row.teacher_ass_post_time
            };
          });
          // Update state with data including auto-incrementing IDs
          setRecentAssignments(assignments);
          setFinalId(assignments.length);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching recent assignments:", error);
        });
      // console.log("Outside use effect",userName);
    }
  }, []);

  const studentDetails = {
    name: "John Doe",
    grade: "10",
    rollNumber: "12345",
    attendancePercentage: "90%",
  };

  // const recentAssignments = [
  //     { id: 1, subject: 'Math', assignment: 'Chapter 5 Problems', dueDate: '2024-03-15', teacher: 'Mr. Smith' },
  //     { id: 2, subject: 'Science', assignment: 'Lab Report on Photosynthesis', dueDate: '2024-03-18', teacher: 'Ms. Johnson' },
  //     { id: 3, subject: 'History', assignment: 'Research Paper on Ancient Civilizations', dueDate: '2024-03-20', teacher: 'Mr. Thompson' },
  // ];

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
                    <th >Assignment</th>
                    <th scope="col">Status</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Assigned Time</th>
                    <th scope="col">Due Date</th>
                  </tr>
                </thead>
                {/* <tbody onClick={handlesubmissionClick(assignment.Auto_increment)}>
                                {recentAssignments.map((assignment) => (
                                    <tr key={assignment.id}>
                                        <th scope="row">{assignment.id}</th>
                                        <td>{assignment.subject}</td>
                                        <td>{assignment.assignment}</td>
                                        <td>{assignment.teacher}</td>
                                        <td>{assignment.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody> */}
                <tbody>
                  {recentAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      onClick={() => handlesubmissionClick(assignment.assign_id, assignment.status)}
                    >
                      <th scope="row">{assignment.id}</th>
                      <td>{assignment.subject}</td>
                      <td>{assignment.assignment}</td>
                      <td>{assignment.status}</td>
                      <td>{assignment.teacher}</td>
                      <td>{assignment.assign_time}</td>
                      <td>{assignment.dueDate}</td>
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
}
