import React, { useState, useEffect } from "react";
import { useUserDetails } from "../Userdetails";
import Work_view from "./work_view";
import { useNavigate } from "react-router-dom";

export default function Staff_Completed_Work() {
  const { userName } = useUserDetails();
  const [staff_assigned_Data, setstaff_assigned_Data] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  // Define categories and standards
  // const categories = ["Category1", "Category2", "Category3"]; // Replace with your categories
  // const standards = ["Standard1", "Standard2", "Standard3"]; // Replace with your standards
  // const categories = [...new Set(staff_assigned_Data.map(student => student.category))];
  // const standards = [...new Set(staff_assigned_Data.map(student => student.class))];

  useEffect(() => {
    if (userName) {
      fetch("http://localhost:3001/staff/completed_work", {
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
          setstaff_assigned_Data(data.users[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userName]);

  // Filter the data based on selected category, standard, and search keyword
  let filteredData = staff_assigned_Data;
  if (selectedCategory !== "All") {
    filteredData = filteredData.filter(
      (assignment) => assignment.category === selectedCategory
    );
  }
  if (selectedStandard !== "All") {
    filteredData = filteredData.filter(
      (assignment) => assignment.class === selectedStandard
    );
  }
  if (searchKeyword) {
    filteredData = filteredData.filter((assignment) =>
      assignment.assignment_title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    );
  }
  const categories = [
    ...new Set(staff_assigned_Data.map((student) => student.category)),
  ];
  const standards = [
    ...new Set(staff_assigned_Data.map((student) => student.class)),
  ];


  const handlesubmissionClick = (classs, category, title) => {

    if (classs) {
      navigate(`/Staff/Completed_work_view`, { state: { classs, category, title } })
    }
    // if(status =='Work Assigned'){
    //  navigate(`/student/Assignment_submission`,{ state: {id}});
    // }
    // if(status =='Work completed'){
    //   navigate(`/student/Student_Completed_work`,{ state: {id}});
    // }
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col">
          {/* Dropdown button to select category */}
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

          {/* Toggle button to select standard */}
          <div
            className="btn-group mb-3"
            role="group"
            aria-label="Basic example"
          >
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
                className={`btn ${selectedStandard === standard
                    ? "btn-primary"
                    : "btn-secondary"
                  }`}
                onClick={() => setSelectedStandard(standard)}
              >
                {standard}
              </button>
            ))}
          </div>

          {/* Search input field */}
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
                  <th>Work Completed Count</th>
                  {/* <th>Work Not Completed Count</th> */}

                </tr>
              </thead>
              <tbody>
                {filteredData.map((assignment) => (
                  <tr
                    key={assignment.category}
                    onClick={() =>
                      handlesubmissionClick(assignment.class, assignment.category, assignment.assignment_title)
                    }
                  >
                    <td scope="row">{assignment.assignment_title}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.category}</td>
                    <td>{assignment.work_completed_count}</td>
                    {/* <td>{assignment.work_in_completed_count}</td> */}

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
