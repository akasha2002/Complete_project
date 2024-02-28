import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";
import { Link, useNavigate } from 'react-router-dom';
import "./assignement_submission.css";

export default function Assignment_submission(props) {
  // console.log(props.id)
  const { userType, userName } = useUserDetails();
  const location = useLocation();
  const [finalAssignments, setFinalAssignments] = useState([]);
  const assignId = location.state?.id;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  
  const [assignedWorkDetails_student, setAssignedWorkDetails_student] = useState({
    
    file: null,
    
  });


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

  const handleConfirmAssignment  = async (event) => {
    event.preventDefault();

    try {
      handleCloseConfirmationModal();

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

      const formData = new FormData();
      formData.append('pdfFile', assignedWorkDetails_student.file);
      formData.append('assign_id',assignId)
      formData.append('dateTime', formattedDate); 
      // formData.append('studentType', studentType);
      // formData.append('title', assignedWorkDetails.title);
      // formData.append('description', assignedWorkDetails.description);
      // formData.append('selectedClass', assignedWorkDetails.selectedClass);
      // formData.append('dueDate', assignedWorkDetails.dueDate);
      // formData.append('teacher_id', userName);

      const response = await axios.post('http://localhost:3001/student/assign_submit_confirm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('Assignment submitted successfully');
        // Reset the form after successful submission
        // navigate('/student/Student_Dashboard'); // Use navigate function to navigate to the specified URL
        setShowMessage(true); // Show the success message
            setTimeout(() => {
                setShowMessage(false); // Hide the success message after 2 seconds
                navigate('/student/Student_Dashboard'); // Use navigate function to navigate to the specified URL
            }, 2000);
        setAssignedWorkDetails_student({
          
          file: null,
          
        });
         // Open confirmation modal
      } else {
        console.error('Failed to submit assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

 

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
    handleOpenConfirmationModal();
    // Handle assignment submission logic here
    // console.log("Assignment submitted!");
  };

  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignedWorkDetails_student((prevDetails) => ({
      ...prevDetails,
      file: file,
    }));
  };
  // console.log(finalAssignments.file)
  // console.log(assignedWorkDetails_student.file)
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

          <div className="button-container">            
            <button
            className="btn btn-primary btn-animated custom-button"
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

          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <label htmlFor="fileInput" className="form-label">
              Choose PDF File
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <button type="submit" className="btn btn-success">
              Submit Assignment
            </button>
          </div>
        </form>
        
      ))}

      {/* Modal */}
      {showConfirmationModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleCloseConfirmationModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to assign this assignment?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmationModal}>No</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmAssignment}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
            {showMessage && (
                <div className="success-message">Assignment submitted successfully.</div>
            )}
        </div>
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
