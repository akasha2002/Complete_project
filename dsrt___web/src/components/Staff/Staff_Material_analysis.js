import React, { useState, useEffect } from "react";
import { useUserDetails } from "../Userdetails";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Staff_Material_analysis() {
  const { userName } = useUserDetails();
  const [staffAssignedData, setStaffAssignedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [offset, setOffset] = useState(0); // Pagination offset
  const [perPage] = useState(10); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      fetch("http://localhost:3001/staff/staff_material_analysis", {
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

  const handleSubmissionClick = (classs, category, material_title,section,teacher_ass_material_time) => {
    // console.log(material_title)
    if (classs) {
      navigate(`/Staff/Staff_Material_status`, {
        state: { classs, category, material_title,section,teacher_ass_material_time },
      });
    }
  };

  // Filter the data based on selected category, standard, and search keyword
  const filteredData = staffAssignedData.filter((assignment) => {
    const categoryMatch =
      selectedCategory === "All" || assignment.category === selectedCategory;
    const standardMatch =
      selectedStandard === "All" || assignment.class === selectedStandard;
    const keywordMatch =
      !searchKeyword ||
      assignment.assignment_title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    return categoryMatch && standardMatch && keywordMatch;
  });

  const categories = [
    ...new Set(staffAssignedData.map((student) => student.category)),
  ];
  const standards = [
    ...new Set(staffAssignedData.map((student) => student.class)),
  ];

  // Handle page change
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setOffset(selectedPage * perPage);
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        {/* Filters */}
        {/* Pagination */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          pageCount={Math.ceil(filteredData.length / perPage)}
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

          <div
            className="btn-group mb-3"
            role="group"
            aria-label="Basic example"
          >
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
                  selectedStandard === standard
                    ? "btn-primary"
                    : "btn-secondary"
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
              placeholder="Search by Assignment Title..."
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
                  <th>#</th>
                  <th>Assignment Title</th>
                  <th>Class</th>
                  <th>Section</th>

                  <th>Category</th>
                  <th>Total Student Count</th>
                  <th>Student Unopened Count</th>

                </tr>
              </thead>
              <tbody>
                {filteredData.slice(offset, offset + perPage).map((assignment, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleSubmissionClick(
                        assignment.class,
                        assignment.category,
                        assignment.material_title,
                        assignment.section,
                        assignment.teacher_ass_material_time
                      )
                    }
                  >
                    <td style={{ fontWeight: "bold" }}>{offset + index + 1}</td>{" "}
                    {/* Auto-incrementing column */}
                    <td scope="row">{assignment.material_title}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.section}</td>
                    {/* <td>{assignment.teacher_ass_material_time}</td> */}


                    <td>{assignment.category}</td>
                    <td>{assignment.total_student_count}</td>
                    <td>{assignment.total_completed_count}</td>

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
