import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Assignment_submission(props) {
  // console.log(props.id)
  const location = useLocation();
  const [finalAssignments, setFinalAssignments] = useState([]);
  const assignId = location.state?.id;
  // console.log(id)
  // const searchParams = new URLSearchParams(location.search);
  // const assignId = searchParams.get('id');
  // console.log(assignId)
  const assignedWorkDetails = {
    title: "Title Assigned by Admin",
    description: "Assignment description provided by admin goes here.",
    pdfFileName: "pdfFile-1707401678445.pdf",
    teacher_name: "akash",
  };

  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    // const fetchPdfFilenames = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3001/get-pdf-filenames');
    //     setPdfFiles(response.data);
    //   } catch (error) {
    //     console.error('Error fetching PDF filenames:', error);
    //   }
    // };

    // fetchPdfFilenames();
    if (assignId) {
      fetch("http://localhost:3001/student/assignment_submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assign_id: assignId,
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
          const assignments_view = data.rows_8[0].map((row, index) => {
            // Extract assignment details from each row
            return {
              assign_by: row.v_teacher_name,
              // Auto_increment: row.Auto_increment,
              assignment_subject: row.v_subjects,
              assignment_desp: row.v_assignment_description,
              assignment_title: row.v_assignment_title,
              assign_dueDate: row.v_due_date,
              assign_pdf: row.v_pdf_file,
            };
          });
          // Update state with data including auto-incrementing IDs
          setFinalAssignments(assignments_view);
          // setFinalId(assignments.length);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching recent assignments:", error);
        });
      // console.log("Outside use effect",userName);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle assignment submission logic here
    // console.log("Assignment submitted!");
  };

  // return (
  //   <>
  //     <div className="container mt-2">
        
  //       {/* Assignment Submission Form */}
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label htmlFor="assignedTitle" className="form-label">
  //             Assigned By
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="assignedTitle"
  //             value={assignments_view.assign_by}
  //             readOnly
  //           />
  //         </div>
  //         {/* Assigned Title */}
  //         <div className="mb-3">
  //           <label htmlFor="assignedTitle" className="form-label">
  //             Assigned Title
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="assignedTitle"
  //             value={assignments_view.assignment_title}
  //             readOnly
  //           />
  //         </div>

  //         {/* Assigned Description */}
  //         <div className="mb-3">
  //           <label htmlFor="assignedDescription" className="form-label">
  //             Assigned Description
  //           </label>
  //           <textarea
  //             className="form-control"
  //             id="assignedDescription"
  //             rows="3"
  //             value={assignments_view.assignment_desp}
  //             readOnly
  //           ></textarea>
  //         </div>

  //         <div className="mb-3">
  //           <label htmlFor="assignedDescription" className="form-label">
  //             Assignment Due date 
  //           </label>
  //           <textarea
  //             className="form-control"
  //             id="assignedDescription"
  //             rows="3"
  //             value={assignments_view.assign_pdf}
  //             readOnly
  //           ></textarea>
  //         </div>

  //         <div>
            
  //             <button
  //               onClick={() =>
  //                 window.open(
  //                   `http://localhost:3001/get-pdf/${assignments_view.assign_pdf}`,
  //                   "_blank"
  //                 )
  //               }
  //             >
  //               Open PDF by Staff
  //             </button>
            
  //         </div>
  //       </form>
        
  //     </div>
  //   </>
  // );
  // console.log(finalAssignments)
  return (
    <div className="container mt-2">
      {finalAssignments.map((assignments_view, index) => (
        <form key={index} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="assignedTitle" className="form-label">
              Assigned By
            </label>
            <input
              type="text"
              className="form-control"
              id="assignedTitle"
              value={assignments_view.assign_by}
              readOnly
            />
          </div>
          {/* Assigned Title */}
          <div className="mb-3">
            <label htmlFor="assignedTitle" className="form-label">
              Assigned Title
            </label>
            <input
              type="text"
              className="form-control"
              id="assignedTitle"
              value={assignments_view.assignment_title}
              readOnly
            />
          </div>

          {/* Assigned Description */}
          <div className="mb-3">
            <label htmlFor="assignedDescription" className="form-label">
              Assigned Description
            </label>
            <textarea
              className="form-control"
              id="assignedDescription"
              rows="3"
              value={assignments_view.assignment_desp}
              readOnly
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="assignedDescription" className="form-label">
              Assignment Due date 
            </label>
            <textarea
              className="form-control"
              id="assignedDescription"
              rows="3"
              value={assignments_view.assign_dueDate}
              readOnly
            ></textarea>
          </div>

          <div>            
            <button
              onClick={() =>
                window.open(
                  `http://localhost:3001/get-pdf/${assignments_view.assign_pdf}`,
                  "_blank"
                )
              }
            >
              Open PDF by Staff
            </button>            
          </div>
        </form>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
  referenceBox: {
    backgroundColor: "lightgray",
    padding: "10px",
    marginRight: "20px",
    borderRadius: "5px",
  },
  assignmentContent: {
    flex: 1,
  },
};
