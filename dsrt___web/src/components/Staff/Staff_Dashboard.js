import React, { useState, useEffect } from "react";
import { useUserDetails } from "../Userdetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import {
  faTasks,
  faExclamationCircle,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import "./StaffDashboard.css"; // Import CSS module for styling

export default function Staff_Dashboard() {
  const { userName } = useUserDetails();
  const [studentData, setStudentData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [additionalData, setAdditionalData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [workStatusData, setWorkStatusData] = useState([]);
  const [dashboard_details_card, setdashboard_details_card] = useState([]);
  const [offset, setOffset] = useState(0); // Pagination offset
  const [perPage] = useState(5); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await fetch(
          "http://localhost:3001/staff_details/students",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
          }
        );
        const studentData = await studentResponse.json();
        setStudentData(studentData.user);

        const additionalResponse = await fetch(
          "http://localhost:3001/staff_details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
          }
        );
        const additionalData = await additionalResponse.json();
        setAdditionalData(additionalData.user);

        const statusResponse = await fetch(
          "http://localhost:3001/staff_dashboard/status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacher_id: userName }),
          }
        );
        const workStatusData = await statusResponse.json();
        setWorkStatusData(workStatusData.users);

        const dashboard_card = await fetch(
          "http://localhost:3001/staff_dashboard/card",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacher_id: userName }),
          }
        );
        const dashboard_card_data = await dashboard_card.json();
        setdashboard_details_card(dashboard_card_data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userName) {
      fetchData();
    }
  }, [userName]);

  const getWorkStatus = (studentId) => {
    const workStatusItem = workStatusData.find(
      (item) => item.student_id === studentId
    );
    return workStatusItem ? workStatusItem.assignment_status : "Not Assigned";
  };

  //  console.log(dashboard_details_card);

  const filteredStudents = studentData.filter((student) => {
    if (selectedCategory !== "All" && student.category !== selectedCategory) {
      return false;
    }
    if (
      selectedStandard !== "All" &&
      student.Student_standard !== selectedStandard
    ) {
      return false;
    }
    if (
      searchKeyword &&
      !student.student_name.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories = [
    ...new Set(studentData.map((student) => student.category)),
  ];
  const standards = [
    ...new Set(studentData.map((student) => student.Student_standard)),
  ];
  // Handle page change
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * perPage);
  };
  return (
    <div className="container-fluid px-4 pageBackground">
      <div className={`row g-3 p-5 dashboard`}>
        <div className="col-md-4">
          <div className={`card crd`}>
            <div className="card-body cbody">
              <div>
                <h3 className={`card-title ctitle`}>{userName}</h3>
                <p className={`card-text ctext`}>Staff_id</p>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faUsersRectangle}
                  className={`rollNumberIcon`}
                  style={{ fontSize: "2.7rem" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card crd`}>
            <div className="card-body cbody">
              <div>
                <h3 className={`card-title ctitle`}>
                  {dashboard_details_card.length > 0
                    ? dashboard_details_card[0].designation
                    : "Loading..."}
                </h3>
                <p className={`card-text ctext`}>Designation</p>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faTasks}
                  className={`assignmentIcon assignedWorkIcon`}
                  style={{ fontSize: "2.7rem" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card crd`}>
            <div className="card-body cbody">
              <div>
                <h3 className={`card-title ctitle`}>
                  {dashboard_details_card.length > 0
                    ? dashboard_details_card[0].student_count
                    : "Loading..."}
                </h3>
                <p className={`card-text ctext`}>Class Handling</p>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className={`pendingIcon incompleteWorkIcon`}
                  style={{ fontSize: "2.9rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={Math.ceil(filteredStudents.length / perPage)}
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

      <div className="dropdown mb-3">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Category: {selectedCategory}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li key="All" onClick={() => setSelectedCategory("All")}>
            <a className="dropdown-item">All</a>
          </li>
          {categories.map((category, index) => (
            <li key={index} onClick={() => setSelectedCategory(category)}>
              <a className="dropdown-item">{category}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="btn-group mb-3" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn ${
            selectedStandard === "All" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setSelectedStandard("All")}
        >
          All Standards
        </button>
        {standards.map((standard, index) => (
          <button
            key={index}
            type="button"
            className={`btn ${
              selectedStandard === standard ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedStandard(standard)}
          >
            {standard}
          </button>
        ))}
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by student name..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setSearchKeyword("")}
        >
          Clear
        </button>
      </div>

      <div className="table-responsive">
        <table
          className="table bg-white rounded shadow-sm table-hover"
          style={{ cursor: "pointer" }}
        >
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th> {/* Auto-incrementing column */}
              <th>Student Name</th>
              <th>Standard</th>
              <th>Section</th>
              <th>Category</th>
              <th>Work Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents
              .slice(offset, offset + perPage)
              .map((student, index) => (
                <tr key={offset + index + 1}>
                  {" "}
                  {/* Adjust key to start from 1 */}
                  <td style={{ fontWeight: "bold" }}>
                    {offset + index + 1}
                  </td>{" "}
                  {/* Adjust index calculation */}
                  <td>{student.student_name}</td>
                  <td>{student.Student_standard}</td>
                  <td>{student.Student_Section}</td>


                  <td>{student.category}</td>
                  <td>{getWorkStatus(student.student_id)}</td>
                </tr>
              ))}
          </tbody>

          {/* <tbody>
      {filteredStudents.map((student, index) => (
        <tr key={index}>
          <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
          <td>{student.student_name}</td>
          <td>{student.Student_standard}</td>
          <td>{student.category}</td>
          <td>{getWorkStatus(student.student_id)}</td>
        </tr>
      ))}
    </tbody> */}
        </table>
      </div>
    </div>
  );
}
