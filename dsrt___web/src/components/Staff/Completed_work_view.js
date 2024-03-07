import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function Completed_work_view() {
  const { userName } = useUserDetails();
  const location = useLocation();
  const classs = location.state?.classs;
  const category = location.state?.category;
  const title = location.state?.title;
  const section = location.state?.section;
  const teacher_ass_post_time = location.state?.teacher_ass_post_time;


  // console.log(section)


  const navigate = useNavigate();

  const [workData, setWorkData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210],
      lineHeight: 1.2,
    });

    // Define current date and time
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Set font style for date and time
    doc.setFont("helvetica", "normal");

    // Add current date and time to the PDF
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate}`, 250, 10, null, null, "right");
    doc.text(`Time: ${currentTime}`, 250, 15, null, null, "right");

    // Define table headers
    const headers = [
      "Assignment Title",
      "Student Name",
      "Student Submit Time",
      "Teacher Ass Post Time",
      "Due Date",
      "Rewards",
    ];

    // Map data to an array of arrays
    const data = filteredWorkData.map((assignment) => [
      assignment.assignment_title,
      assignment.student_name,
      assignment.student_submit_time,
      assignment.teacher_ass_post_time,
      assignment.due_date,
      assignment.rewards,
    ]);

    // Add table using autoTable
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 25, // Adjust startY to leave space for date and time
      styles: {
        overflow: "linebreak",
        cellPadding: 2,
      },
      columnStyles: {
        0: { columnWidth: 50 },
        1: { columnWidth: 50 },
        2: { columnWidth: 50 },
        3: { columnWidth: 50 },
        4: { columnWidth: 50 },
        5: { columnWidth: 50 },
      },
      margin: { top: 20, bottom: 20, left: 10, right: 10 },
    });

    doc.save("completed_work.pdf");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/staff/work_completed_work_view",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: userName,
              classs: classs,
              category: category,
              title: title,
              section:section,
              teacher_ass_post_time:teacher_ass_post_time
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          setWorkData(data.rows_15[0]);
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classs, category, userName]);

  const filteredWorkData = selectedStatus
    ? workData.filter(
        (assignment) => assignment.assignment_status === selectedStatus
      )
    : workData;

  return (
    <div className="container-fluid my-4">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Assignment Title</th>
              <th>Student Name</th>
              <th>Student Submit Time</th>
              <th>Teacher Ass Post Time</th>
              <th>Due Date</th>
              <th>Assignment PDF Student</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkData.map((assignment, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                <td style={{ fontWeight: "bold" }}>{index + 1}</td>{" "}
                {/* Auto-incrementing column */}
                <td>{assignment.assignment_title}</td>
                <td>{assignment.student_name}</td>
                <td>{assignment.student_submit_time}</td>
                <td>{assignment.teacher_ass_post_time}</td>
                <td>{assignment.due_date}</td>
                <td>
                  {assignment.assignment_pdf_student && (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        window.open(
                          `http://localhost:3001/get-pdf/${assignment.assignment_pdf_student}`,
                          "_blank"
                        )
                      }
                    >
                      Open PDF
                    </button>
                  )}
                </td>
                <td>{assignment.rewards}</td>
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            <tr>
              <td >
                <div >
                  <button onClick={generatePDF} className="btn btn-success">
                    Generate PDF
                  </button>
                </div>
              </td>
            </tr>
          </tfoot> */}
        </table>
        <div>
          <button onClick={generatePDF} className="btn btn-success">
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useUserDetails } from "../Userdetails";
// import { Link, useNavigate } from "react-router-dom";
// // import jsPDF from "jspdf";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// export default function Completed_work_view() {
//   const { userName } = useUserDetails();
//   const location = useLocation();
//   const classs = location.state?.classs;
//   const category = location.state?.category;
//   const title = location.state?.title;

//   const navigate = useNavigate();

//   // State to store fetched data
//   const [workData, setWorkData] = useState([]);
//   // State to store the selected status for filtering
//   const [selectedStatus, setSelectedStatus] = useState("");

//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           // "http://192.168.1.2:3001/staff/work_completed_work_view",
//           "http://localhost:3001/staff/work_completed_work_view",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userName: userName,
//               classs: classs,
//               category: category,
//               title: title,
//             }),
//           }
//         );
//         const data = await response.json();
//         if (data.success) {
//           // Extract the assignment data from the nested array
//           setWorkData(data.rows_15[0]);
//         } else {
//           console.error("API request failed");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     // Call the fetch data function
//     fetchData();
//   }, [classs, category, userName]);

//   // Function to handle reward input change
//   const handleRewardChange = (index, value) => {
//     const updatedWorkData = [...workData];
//     updatedWorkData[index].rewards = value;
//     setWorkData(updatedWorkData);
//   };

//   // Function to filter workData based on selectedStatus
//   const filteredWorkData = selectedStatus
//     ? workData.filter(
//         (assignment) => assignment.assignment_status === selectedStatus
//       )
//     : workData;

//   // Function to generate PDF

// // Function to generate PDF
// const generatePDF = () => {
//   const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'mm',
//     format: [297, 210],
//     lineHeight: 1.2
//   });

//   // Define current date and time
//   const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//   // Set font style for date and time
//   doc.setFont('helvetica', 'normal');

//   // Add current date and time to the PDF
//   doc.setFontSize(10);
//   doc.text(`Date: ${currentDate}`, 250, 10, null, null, 'right');
//   doc.text(`Time: ${currentTime}`, 250, 15, null, null, 'right');

//   // Define table headers
//   const headers = ["Assignment Title", "Student Name", "Student Submit Time", "Teacher Ass Post Time", "Due Date", "Rewards"];

//   // Map data to an array of arrays
//   const data = filteredWorkData.map(assignment => [
//     assignment.assignment_title,
//     assignment.student_name,
//     assignment.student_submit_time,
//     assignment.teacher_ass_post_time,
//     assignment.due_date,
//     assignment.rewards
//   ]);

//   // Add table using autoTable
//   doc.autoTable({
//     head: [headers],
//     body: data,
//     startY: 25, // Adjust startY to leave space for date and time
//     styles: {
//       overflow: 'linebreak',
//       cellPadding: 2
//     },
//     columnStyles: { 0: { columnWidth: 50 }, 1: { columnWidth: 50 }, 2: { columnWidth: 50 }, 3: { columnWidth: 50 }, 4: { columnWidth: 50 }, 5: { columnWidth: 50 } },
//     margin: { top: 20, bottom: 20, left: 10, right: 10 }
//   });

//   doc.save("completed_work.pdf");
// };

//   // Render confirmation dialog
//   return (
//     <div>
//       <div>
//         <table style={{ borderCollapse: "collapse", width: "100%" }}>
//           {/* Table content here */}
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Assignment Title
//               </th>

//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Student Name
//               </th>

//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Student Submit Time
//               </th>
//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Teacher Ass Post Time
//               </th>
//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Due Date
//               </th>
//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Assignment PDF Student
//               </th>
//               <th
//                 style={{
//                   padding: "12px 15px",
//                   borderBottom: "1px solid #ddd",
//                   background: "#f2f2f2",
//                   textAlign: "left",
//                 }}
//               >
//                 Rewards
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredWorkData.map((assignment, index) => (
//               <tr
//                 key={index}
//                 style={{ background: index % 2 === 0 ? "#f5f5f5" : "white" }}
//               >
//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.assignment_title}
//                 </td>

//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.student_name}
//                 </td>

//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.student_submit_time}
//                 </td>
//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.teacher_ass_post_time}
//                 </td>
//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.due_date}
//                 </td>
//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.assignment_pdf_student && (
//                     <button
//                       style={{
//                         backgroundColor: "#4caf50",
//                         color: "white",
//                         border: "none",
//                         padding: "8px 12px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() =>
//                         window.open(
//                           `http://localhost:3001/get-pdf/${assignment.assignment_pdf_student}`,
//                           "_blank"
//                         )
//                       }
//                     >
//                       Open PDF
//                     </button>
//                   )}
//                 </td>
//                 <td
//                   style={{
//                     padding: "12px 15px",
//                     borderBottom: "1px solid #ddd",
//                     textAlign: "left",
//                   }}
//                 >
//                   {assignment.rewards}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="7" style={{ textAlign: "left" }}>
//                 <div style={{ paddingLeft: "20px", paddingTop: "20px"}}>
//                   <button onClick={generatePDF} style={{ backgroundColor: "#4caf50", color: "white", border: "none", padding: "8px 12px", cursor: "pointer" }}>
//                     Generate PDF
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }
