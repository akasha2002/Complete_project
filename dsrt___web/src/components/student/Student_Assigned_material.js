import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from "../Userdetails";
import axios from 'axios';

export default function Student_Assigned_material() {
  const { userType, userName } = useUserDetails();
  const [recentAssignments, setRecentAssignments] = useState([]);

  const navigate = useNavigate();

  const handlesubmissionClick_pdf = (pdf,Auto_increment) => {
    window.open(`http://localhost:3001/get-pdf/${pdf}`, "_blank");
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    fetch("http://localhost:3001/student/material_view_2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a_incremant: Auto_increment,
        date:formattedDate
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error("Error fetching recent assignments:", error);
      });
  };

  useEffect(() => {
    if (userName) {
      fetch("http://localhost:3001/student/material_view", {
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
          return response.json();
        })
        .then((data) => {
          const assignments = data.rows_4[0].map((row, index) => {
            return {
              id: index + 1, 
              teacher: row.teacher_name,
              subject: row.subjects,
              Auto_increment:row.Auto_increment,
              assignment: row.material_title,
              assign_time: row.teacher_ass_material_time,
              pdf: row.material_pdf 
            };
          });
          setRecentAssignments(assignments);
        })
        .catch((error) => {
          console.error("Error fetching recent assignments:", error);
        });
    }
  }, [userName]);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-5">
          <h3 className="fs-4 mb-3">Materials</h3>
          <div className="col">
            <div className="table-responsive">
              <table className="table bg-white rounded shadow-sm table-hover" style={{'cursor': 'pointer'}}>
                <thead>
                  <tr>
                    <th scope="col" width="50">#</th>
                    <th scope="col">Subject</th>
                    <th>Assignment</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Assigned Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssignments.map((assignment, index) => (
                    <tr
                      key={index}
                      onClick={() => handlesubmissionClick_pdf(assignment.pdf,assignment.Auto_increment)}
                    >
                      <th scope="row">{assignment.id}</th>
                      {/* <td>{assignment.Auto_increment}</td> */}

                      <td>{assignment.subject}</td>
                      <td>{assignment.assignment}</td>
                      <td>{assignment.teacher}</td>
                      <td>{assignment.assign_time}</td>
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
