// import React, { useState } from "react";
// import axios from "axios";
// import { useUserDetails } from '../Userdetails';  
// export default function Staff_Assign_Work() {
//   const { userType, userName } = useUserDetails();
//   const [assignedWorkDetails, setAssignedWorkDetails] = useState({
//     title: 'Title Assigned by Admin',
//     description: 'Assignment description provided by admin goes here.',
//     file: null,
//     selectedClass: '', // Initialize selectedClass state
//     selectedSection: '',
//     dueDate: ''
//   });

//   const [studentType, setStudentType] = useState('bright'); // Default is 'bright'

  
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('pdfFile', assignedWorkDetails.file);
//       formData.append('studentType', studentType);
//       formData.append('title', assignedWorkDetails.title);
//       formData.append('description', assignedWorkDetails.description);
//       formData.append('selectedClass', assignedWorkDetails.selectedClass);
//       formData.append('dueDate', assignedWorkDetails.dueDate);
//       formData.append('teacher_id', userName);

//       const response = await axios.post('http://localhost:3001/work_assign/teacher', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         console.log('Assignment submitted successfully');
//         // Reset the form after successful submission
//         setAssignedWorkDetails({
//           title: 'Title Assigned by Admin',
//           description: 'Assignment description provided by admin goes here.',
//           file: null,
//           selectedClass: '', // Reset selected class
//           selectedSection: '',
//           dueDate: ''
//         });
//       } else {
//         console.error('Failed to submit assignment');
//       }
//     } catch (error) {
//       console.error('Error submitting assignment:', error);
//     }
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
//         const file = event.target.files[0];
//         setAssignedWorkDetails((prevDetails) => ({
//           ...prevDetails,
//           file: file,
//         }));
//       };

//       const handleDueDateChange = (event) => {
//         setAssignedWorkDetails((prevDetails) => ({
//           ...prevDetails,
//           dueDate: event.target.value,
//         }));
//       };

//   const handleClassChange = (event) => {
//     const selectedClass = event.target.value;
//     setAssignedWorkDetails((prevDetails) => ({
//       ...prevDetails,
//       selectedClass: selectedClass,
//     }));
//   };

//   const handleStudentTypeToggle = () => {
//     setStudentType((prevType) => (prevType === 'bright' ? 'weak' : 'bright'));
//   };

//   return (
//     <>
//       <div className="container mt-4" style={{ paddingTop: '0px' }}>
//         <div className="position-absolute top-2 end-0 m-3">
//           <div className="btn-group" role="group">
//             <button
//               type="button"
//               className={`btn btn-${studentType === 'bright' ? 'primary' : 'secondary'}`}
//               onClick={handleStudentTypeToggle}
//             >
//               Fast Learner
//             </button>
//             <button
//               type="button"
//               className={`btn btn-${studentType === 'weak' ? 'primary' : 'secondary'}`}
//               onClick={handleStudentTypeToggle}
//             >
//               Slow Learner
//             </button>
//           </div>
//         </div>
//         <h2 className="mt-4">Assignment </h2>

//         <form onSubmit={handleSubmit}>
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

//           <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <label htmlFor="classDropdown" className="form-label">
//               Select Class
//             </label>
//             <select
//               className="form-select"
//               id="classDropdown"
//               value={assignedWorkDetails.selectedClass}
//               onChange={handleClassChange}
//               required
//             >
//               <option value="" disabled>Select Class</option>
//               <option value="10 th">10th</option>
//               <option value="11 th">11th</option>
//               <option value="12 th">12th</option>
//             </select>
//           </div>
//           {/* Choose File */}
//           <div className="mb-3" style={{ paddingTop: '20px' }}>
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
//           </div>

//           <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <label htmlFor="dueDate" className="form-label">
//               Due Date
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="dueDate"
//               value={assignedWorkDetails.dueDate}
//               onChange={handleDueDateChange}
//               required
//             />
//           </div>
          
//           <div className="mb-3" style={{ paddingTop: '20px' }}>
//             <button type="submit" className="btn btn-success">
//               Assign Assignment
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


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
    dueDate: ''
  });

  const [studentType, setStudentType] = useState('bright'); // Default is 'bright'
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleOpenConfirmationModal();
  };

  

  const handleConfirmAssignment  = async (event) => {
    event.preventDefault();

    try {
      handleCloseConfirmationModal();
      const formData = new FormData();
      formData.append('pdfFile', assignedWorkDetails.file);
      formData.append('studentType', studentType);
      formData.append('title', assignedWorkDetails.title);
      formData.append('description', assignedWorkDetails.description);
      formData.append('selectedClass', assignedWorkDetails.selectedClass);
      formData.append('dueDate', assignedWorkDetails.dueDate);
      formData.append('teacher_id', userName);

      const response = await axios.post('http://localhost:3001/work_assign/teacher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
          dueDate: ''
        });
         // Open confirmation modal
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignedWorkDetails((prevDetails) => ({
      ...prevDetails,
      file: file,
    }));
  };

  const handleDueDateChange = (event) => {
    setAssignedWorkDetails((prevDetails) => ({
      ...prevDetails,
      dueDate: event.target.value,
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
      <div className="container mt-4" style={{ paddingTop: '0px' }}>
        <div className="position-absolute top-2 end-0 m-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-${studentType === 'bright' ? 'primary' : 'secondary'}`}
              onClick={handleStudentTypeToggle}
            >
              Fast Learner
            </button>
            <button
              type="button"
              className={`btn btn-${studentType === 'weak' ? 'primary' : 'secondary'}`}
              onClick={handleStudentTypeToggle}
            >
              Slow Learner
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
          {/* Choose File */}
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
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={assignedWorkDetails.dueDate}
              onChange={handleDueDateChange}
              required
            />
          </div>
          
          <div className="mb-3" style={{ paddingTop: '20px' }}>
            <button type="submit" className="btn btn-success">
              Assign Assignment
            </button>
          </div>
        </form>
      </div>

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
    </>
  );
}



