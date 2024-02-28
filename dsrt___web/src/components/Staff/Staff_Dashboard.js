import React, { useState, useEffect } from "react";
import { useUserDetails } from "../Userdetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  return (
    <div className="container-fluid px-4 pageBackground">
      <div className={`row g-3 p-5 dashboard`}>
        <div className="col-md-4">
          <div className={`card crd`}>
            <div className="card-body cbody">
              <div>
                <h3 className={`card-title ctitle`}>
                  {userName}
                </h3>
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
                  {dashboard_details_card.length > 0 ? dashboard_details_card[0].student_count : 'Loading...'}
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
          className={`btn ${selectedStandard === "All" ? "btn-primary" : "btn-secondary"
            }`}
          onClick={() => setSelectedStandard("All")}
        >
          All Standards
        </button>
        {standards.map((standard, index) => (
          <button
            key={index}
            type="button"
            className={`btn ${selectedStandard === standard ? "btn-primary" : "btn-secondary"
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
          style={{"z-index": "0"}}
        >
          Clear
        </button>
      </div>

      <div className="table-responsive">
        <table className="table bg-white rounded shadow-sm table-hover" style={{'cursor': 'pointer'}}>
          <thead className="bg-primary text-white">
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Standard</th>
              <th>Category</th>
              <th>Work Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.student_id}</td>
                <td>{student.student_name}</td>
                <td>{student.Student_standard}</td>
                <td>{student.category}</td>
                <td>{getWorkStatus(student.student_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
