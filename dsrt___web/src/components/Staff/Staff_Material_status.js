import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function Staff_Material_status() {
  const { userName } = useUserDetails();
  const location = useLocation();
  const classs = location.state?.classs;
  const category = location.state?.category;
  const material_title = location.state?.material_title;
  const section =location.state?.section;
  const teacher_ass_material_time =location.state?.teacher_ass_material_time;
// console.log(material_title)  

  const [offset, setOffset] = useState(0); // Pagination offset
  const [perPage] = useState(10); // Number of items per page
  

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

    // // Define table headers
    // <td>{assignment.material_title}</td>
    //             <td>{assignment.student_name}</td>
    //             <td>{assignment.student_view_time}</td>
    //             <td>{assignment.teacher_ass_material_time}</td>
    //             <td>{assignment.material_status}</td>
    //             <th>#</th>
    //           <th>Material Title</th>
    //           <th>Student Name</th>
    //           <th>Student View Time</th>
    //           <th>Student View Time</th>
    //           <th></th>
    const headers = [
      "Material Title",
      "Student Name",
      "Teacher Ass Post Time",
      "Student View Time",
      "Material Status",
    ];

    // Map data to an array of arrays
    const data = filteredWorkData.map((assignment) => [
      assignment.material_title,
      assignment.student_name,
      assignment.teacher_ass_material_time,
      assignment.student_view_time,
      assignment.material_status,
     
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
          "http://localhost:3001/staff/staff_material_status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: userName,
              classs: classs,
              category: category,
              title: material_title,
              section:section,
              teacher_ass_material_time:teacher_ass_material_time
              
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
  }, []);

  const filteredWorkData = selectedStatus
    ? workData.filter(
        (assignment) => assignment.material_status  === selectedStatus
      )
    : workData; 

   // Handle page change
   const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * perPage);
  };

  const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="container-fluid my-4">
      {/* Filters */}
      {/* Pagination */}
      <div className="mb-3">
        <label htmlFor="materialStatusFilter" className="form-label">
          Filter by Material Status:
        </label>
        <select
          className="form-select"
          id="materialStatusFilter"
          value={selectedStatus}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Opened">Opened</option>
          <option value="Not Opened">Not Opened</option>
          {/* Add other material status options as needed */}
        </select>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={Math.ceil(filteredWorkData.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Material Title</th>
              <th>Student Name</th>
              <th>Student View Time</th>
              <th>Teacher Ass Post Time</th>
              <th>Material Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkData.slice(offset, offset + perPage).map((assignment, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                <td style={{ fontWeight: "bold" }}>{offset + index + 1}</td>{" "}
                {/* Auto-incrementing column */}
                <td>{assignment.material_title}</td>
                <td>{assignment.student_name}</td>
                <td>{assignment.student_view_time}</td>
                <td>{assignment.teacher_ass_material_time}</td>
                <td>{assignment.material_status}</td>
               
              </tr>
            ))}
          </tbody>
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
