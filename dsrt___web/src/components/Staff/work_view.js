import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserDetails } from "../Userdetails";
import { Link, useNavigate } from "react-router-dom";

export default function Work_view() {
  const { userName } = useUserDetails();
  const location = useLocation();
  const classs = location.state?.classs;
  const category = location.state?.category;
  const title = location.state?.title;
  const section = location.state?.section;
  const teacher_ass_post_time = location.state?.teacher_ass_post_time;

  const navigate = useNavigate();

  const [workData, setWorkData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/staff/work_view", {
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
        });
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

  const handleRewardChange = (index, value) => {
    const updatedWorkData = [...workData];
    updatedWorkData[index].rewards = value;
    setWorkData(updatedWorkData);
  };

  const filteredWorkData = selectedStatus
    ? workData.filter(
        (assignment) => assignment.assignment_status === selectedStatus
      )
    : workData;

  const hasWorkCompleted = filteredWorkData.some(
    (assignment) => assignment.assignment_status === "Work Completed"
  );

  const handleSubmit = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      try {
        const rewardsToSend = workData
          .filter((assignment) => assignment.rewards !== "")
          .map((assignment) => ({
            student_id: assignment.student_id,
            title: assignment.assignment_title,
            teacher_id: userName,
            rewards: assignment.rewards,
            teacher_submit_time:teacher_ass_post_time
          }));

        const response = await fetch(
          "http://localhost:3001/staff/workview_submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rewardsToSend),
          }
        );

        if (response.ok) {
          console.log("Rewards submitted successfully!");
          navigate("/Staff/Staff_Dashboard");
        } else {
          console.error("Failed to submit rewards.");
        }
      } catch (error) {
        console.error("Error submitting rewards:", error);
      }
    }
  };

  // console.log(showConfirmation);

  return (
    <>
      <div className="container-fluid my-4">
        {/* {showConfirmation && <div className="modal-backdrop"></div>} */}
        <div className={showConfirmation ? "blurred-content" : ""}>
          <div className="mb-3">
            <label htmlFor="statusFilter" className="fw-bold">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
            >
              <option value="">All</option>
              <option value="Work Assigned">Work Assigned</option>
              <option value="Work Completed">Work Completed</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Assignment Title</th>
                  {/* <th>Student Id</th> */}
                  <th>Student Name</th>
                  <th>Assignment Status</th>
                  <th>Student Submit Time</th>
                  <th>Teacher Ass Post Time</th>
                  <th>Due Date</th>
                  <th>Assignment PDF Student</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkData.map((assignment, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: "bold" }}>{index + 1}</td>{" "}
                    {/* Auto-incrementing column */}
                    <td>{assignment.assignment_title}</td>
                    {/* <td>{assignment.student_id}</td> */}
                    <td>{assignment.student_name}</td>
                    <td>{assignment.assignment_status}</td>
                    <td>{assignment.student_submit_time}</td>
                    <td>{assignment.teacher_ass_post_time}</td>
                    <td>{assignment.due_date}</td>
                    <td>
                      {assignment.assignment_pdf_student && (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            window.open(
                              `http://192.168.252.146:3001/get-pdf/${assignment.assignment_pdf_student}`,
                              "_blank"
                            )
                          }
                        >
                          Open PDF
                        </button>
                      )}
                    </td>
                    <td>
                      {assignment.assignment_status !== "Work Assigned" ? (
                        <select
                          value={assignment.rewards || ""}
                          onChange={(e) =>
                            handleRewardChange(index, e.target.value)
                          }
                          className="form-select"
                        >
                          {[...Array(11)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary mt-1">
            Submit
          </button>
        </div>
        <div
          className={`modal ${showConfirmation ? "d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Submit</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => handleConfirmation(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to submit reards </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleConfirmation(true)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
