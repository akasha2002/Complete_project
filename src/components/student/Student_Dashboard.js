import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Student_Dashboard(props) {
    const { state : Username} = useLocation();
    console.log(Username)
    const studentDetails = {
        name: 'John Doe',
        grade: '10',
        rollNumber: '12345',
        attendancePercentage: '90%',
    };

    const recentAssignments = [
        { id: 1, subject: 'Math', assignment: 'Chapter 5 Problems', dueDate: '2024-03-15' },
        { id: 2, subject: 'Science', assignment: 'Lab Report on Photosynthesis', dueDate: '2024-03-18' },
        { id: 3, subject: 'History', assignment: 'Research Paper on Ancient Civilizations', dueDate: '2024-03-20' },
    ];

    return (
        <>
            <div className="container-fluid px-4">
            <div className="row g-3 my-2">
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{studentDetails.grade}</h3>
                                <p className="fs-5">Grade</p>
                            </div>
                            <i className="fas fa-graduation-cap fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{studentDetails.rollNumber}</h3>
                                <p className="fs-5">Roll Number</p>
                            </div>
                            <i className="fas fa-id-card fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{studentDetails.attendancePercentage}</h3>
                                <p className="fs-5">Attendance</p>
                            </div>
                            <i className="fas fa-calendar-check fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{studentDetails.name}</h3>
                                <p className="fs-5">Student Name</p>
                            </div>
                            <i className="fas fa-user fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                <h3 className="fs-4 mb-3">Recent Assignments</h3>
                    <div className="col">
                        <table className="table bg-white rounded shadow-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">#</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Assignment</th>
                                    <th scope="col">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAssignments.map((assignment) => (
                                    <tr key={assignment.id}>
                                        <th scope="row">{assignment.id}</th>
                                        <td>{assignment.subject}</td>
                                        <td>{assignment.assignment}</td>
                                        <td>{assignment.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
