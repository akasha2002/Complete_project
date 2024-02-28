import React, { useState, useEffect } from "react";
import { useUserDetails } from "../Userdetails";
import { useNavigate } from "react-router-dom";

export default function Staff_Assigned_Work() {
  const { userName } = useUserDetails();
  const [staffAssignedData, setStaffAssignedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      // fetch("http://192.168.1.2:3001/staff/assigned_work", {
        fetch("http://localhost:3001/staff/assigned_work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherid: userName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setStaffAssignedData(data.users[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userName]);

  const handleSubmissionClick = (classs, category, title) => {
    if (classs) {
      navigate(`/Staff/Staff_work_view`, { state: { classs, category, title } });
    }
  };

  // Filter the data based on selected category, standard, and search keyword
  const filteredData = staffAssignedData.filter((assignment) => {
    const categoryMatch = selectedCategory === "All" || assignment.category === selectedCategory;
    const standardMatch = selectedStandard === "All" || assignment.class === selectedStandard;
    const keywordMatch = !searchKeyword || assignment.assignment_title.toLowerCase().includes(searchKeyword.toLowerCase());
    return categoryMatch && standardMatch && keywordMatch;
  });

  const categories = [...new Set(staffAssignedData.map((student) => student.category))];
  const standards = [...new Set(staffAssignedData.map((student) => student.class))];

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col">
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
              className={`btn ${selectedStandard === "All" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSelectedStandard("All")}
            >
              All Standards
            </button>
            {standards.map((standard, index) => (
              <button
                key={index}
                type="button"
                className={`btn ${selectedStandard === standard ? "btn-primary" : "btn-secondary"}`}
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
              placeholder="Search by Assignment Title..."
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
                  <th>Assignment Title</th>
                  <th>Class</th>
                  <th>Category</th>
                  <th>Work Assigned Count</th>
                  <th>Work Completed Count</th>
                  <th>Mark Given Count</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((assignment, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleSubmissionClick(
                        assignment.class,
                        assignment.category,
                        assignment.assignment_title
                      )
                    }
                  >
                    <td scope="row">{assignment.assignment_title}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.category}</td>
                    <td>{assignment.work_assigned_count}</td>
                    <td>{assignment.work_completed_count}</td>
                    <td>{assignment.mark_completed_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
