// // import React from 'react'
// import React, { useState, useEffect } from "react";
// import { useUserDetails } from '../../Userdetails';
// export default function Assign_Work(props) {
//   const { userType, userName } = useUserDetails();
//   console.log("Username in assign_work:",userName)
//   const [assignedWorkDetails, setAssignedWorkDetails] = useState({
//     title: 'Title Assigned by Admin',
//     description: 'Assignment description provided by admin goes here.',
//     file: null,
//     selectedClass: '',
//     selectedSection: '',
//   });

//   const [studentType, setStudentType] = useState('bright'); // Default is 'bright'

//   const classes = ['10th', '11th', '12th']; // Add your classes
//   const sections = ['Section A', 'Section B', 'Section C']; // Add your sections

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle assignment submission logic here
//     console.log('Assignment submitted!', assignedWorkDetails);
//   };

//   const handleTitleChange = (event) => {
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       title: event.target.value,
//     }));
//   };

//   const handleDescriptionChange = (event) => {
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       description: event.target.value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       file: file,
//     }));
//   };

//   const handleClassChange = (event) => {
//     const selectedClass = event.target.value;
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       selectedClass: selectedClass,
//     }));
//   };

//   const handleSectionChange = (event) => {
//     const selectedSection = event.target.value;
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       selectedSection: selectedSection,
//     }));
//   };

//   const handleStudentTypeToggle = () => {
//     setStudentType((prevType) => (prevType === 'bright' ? 'weak' : 'bright'));
//   };

//   return (
//     <>
//       {/* <h1>This is Assign work page</h1> */}
//       <div className="container mt-4" style={{ paddingTop: '20px' }}>
//         {/* Student Type Toggle Button */}
//         <div className="position-absolute top-0 end-0 m-3">
//           <div className="btn-group" role="group">
//             <button
//               type="button"
//               className={`btn btn-${studentType === 'bright' ? 'primary' : 'secondary'}`}
//               onClick={handleStudentTypeToggle}
//             >
//               Bright
//             </button>
//             <button
//               type="button"
//               className={`btn btn-${studentType === 'weak' ? 'primary' : 'secondary'}`}
//               onClick={handleStudentTypeToggle}
//             >
//               Weak
//             </button>
//           </div>
//         </div>
//         <h2 className="mt-4">Assignment </h2>

//         {/* Class Dropdown */}
//         <div className="mb-3" style={{ paddingTop: '20px' }}>
//           <label htmlFor="classDropdown" className="form-label">
//             Select Class
//           </label>
//           <select
//             className="form-select"
//             id="classDropdown"
//             value={assignedWorkDetails.selectedClass}
//             onChange={handleClassChange}
//             required
//           >
//             <option value="" disabled>Select Class</option>
//             {classes.map((className, index) => (
//               <option key={index} value={className}>
//                 {className}
//               </option>
//             ))}
//           </select>
//         </div>
// {/* 
//         Section Dropdown
//         <div className="mb-3" style={{ paddingTop: '20px' }}>
//           <label htmlFor="sectionDropdown" className="form-label">
//             Select Section
//           </label>
//           <select
//             className="form-select"
//             id="sectionDropdown"
//             value={assignedWorkDetails.selectedSection}
//             onChange={handleSectionChange}
//             required
//           >
//             <option value="" disabled>Select Section</option>
//             {sections.map((section, index) => (
//               <option key={index} value={section}>
//                 {section}
//               </option>
//             ))}
//           </select>
//         </div> */}



//         {/* Display Assigned Work Details */}
//         {/* Assignment Submission Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Assigned Title */}
//           <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <label htmlFor="assignedTitle" className="form-label">
//               Assignment Title
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="assignedTitle"
//               value={assignedWorkDetails.title}
//               onChange={handleTitleChange}
//             />
//           </div>

//           {/* Assigned Description */}
//           <div className="mt-4" style={{ paddingTop: '20px' }}>
//             <label htmlFor="assignedDescription" className="form-label">
//               Assignment Description
//             </label>
//             <textarea
//               className="form-control"
//               id="assignedDescription"
//               rows="3"
//               value={assignedWorkDetails.description}
//               onChange={handleDescriptionChange}
//             ></textarea>
//           </div>

//           {/* Choose File */}
//           {/* <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <label htmlFor="fileInput" className="form-label">
//               Choose PDF File
//             </label>
//             <input
//               type="file"
//               className="form-control"
//               id="fileInput"
//               accept=".pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div> */}


//           {/* Submit Button */}
//           <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <button type="submit" className="btn btn-success">
//               Assign Assignment
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// } '''''''''' 
import React, { useState } from "react";
import axios from "axios";
import { useUserDetails } from '../Userdetails';
export default function Staff_Assign_Work() {
  const { userType, userName } = useUserDetails();
  const [assignedWorkDetails, setAssignedWorkDetails] = useState({
    title: 'Title Assigned by Admin',
    description: 'Assignment description provided by admin goes here.',
    file: null,
    selectedClass: '', // Initialize selectedClass state
    selectedSection: '',
  });

  const [studentType, setStudentType] = useState('bright'); // Default is 'bright'

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/work_assign/teacher', {
        studentType: studentType,
        title: assignedWorkDetails.title,
        description: assignedWorkDetails.description,
        selectedClass: assignedWorkDetails.selectedClass,
        teacher_id:userName// Include selected class
      });

      if (response.status === 200) {
        console.log('Assignment submitted successfully');
        // Reset the form after successful submission
        setAssignedWorkDetails({
          title: 'Title Assigned by Admin',
          description: 'Assignment description provided by admin goes here.',
          file: null,
          selectedClass: '', // Reset selected class
          selectedSection: '',
        });
      } else {
        console.error('Failed to submit assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const handleTitleChange = (event) => {
    setAssignedWorkDetails((prevDetails) => ({
      ...prevDetails,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setAssignedWorkDetails((prevDetails) => ({
      ...prevDetails,
      description: event.target.value,
    }));
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setAssignedWorkDetails((prevDetails) => ({
      ...prevDetails,
      selectedClass: selectedClass,
    }));
  };

  const handleStudentTypeToggle = () => {
    setStudentType((prevType) => (prevType === 'bright' ? 'weak' : 'bright'));
  };

  return (
    <>
      <div className="container mt-4" style={{ paddingTop: '20px' }}>
        <div className="position-absolute top-0 end-0 m-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-${studentType === 'bright' ? 'primary' : 'secondary'}`}
              onClick={handleStudentTypeToggle}
            >
              Bright
            </button>
            <button
              type="button"
              className={`btn btn-${studentType === 'weak' ? 'primary' : 'secondary'}`}
              onClick={handleStudentTypeToggle}
            >
              Weak
            </button>
          </div>
        </div>
        <h2 className="mt-4">Assignment </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <label htmlFor="assignedTitle" className="form-label">
              Assignment Title
            </label>
            <input
              type="text"
              className="form-control"
              id="assignedTitle"
              value={assignedWorkDetails.title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="mt-4" style={{ paddingTop: '20px' }}>
            <label htmlFor="assignedDescription" className="form-label">
              Assignment Description
            </label>
            <textarea
              className="form-control"
              id="assignedDescription"
              rows="3"
              value={assignedWorkDetails.description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <label htmlFor="classDropdown" className="form-label">
              Select Class
            </label>
            <select
              className="form-select"
              id="classDropdown"
              value={assignedWorkDetails.selectedClass}
              onChange={handleClassChange}
              required
            >
              <option value="" disabled>Select Class</option>
              <option value="10 th">10th</option>
              <option value="11 th">11th</option>
              <option value="12 th">12th</option>
            </select>
          </div>

          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <button type="submit" className="btn btn-success">
              Assign Assignment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}



