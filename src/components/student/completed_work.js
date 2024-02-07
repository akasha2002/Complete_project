import React from 'react'

export default function Completed_work() {
    const completedAssignments = [
        { id: 1, subject: 'Math', assignment: 'Chapter 4 Problems', completionDate: '2024-03-10' },
        { id: 2, subject: 'Science', assignment: 'Lab Report on Chemical Reactions', completionDate: '2024-03-12' },
        { id: 3, subject: 'English', assignment: 'Book Review: To Kill a Mockingbird', completionDate: '2024-03-15' },
        // Add more completed assignments as needed
    ];

    return (
        <>
            <div className="container-fluid px-4">
                <div className="row g-3 my-2">
                    {/* Customize additional sections or components specific to the Completed Work page */}
                    <div className="col-md-6">
                        <div className="p-3 bg-light shadow-sm rounded">
                            <h3 className="fs-4 mb-3">Your Completed Assignments</h3>
                            <p className="fs-6">Check the list of assignments you have successfully completed.</p>
                        </div>
                    </div>
                    {/* Add more sections as needed */}
                </div>
                <div className="row my-5">
                    <h3 className="fs-4 mb-3">Completed Assignments</h3>
                    <div className="col">
                        <table className="table bg-white rounded shadow-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">#</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Assignment</th>
                                    <th scope="col">Completion Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedAssignments.map((assignment) => (
                                    <tr key={assignment.id}>
                                        <th scope="row">{assignment.id}</th>
                                        <td>{assignment.subject}</td>
                                        <td>{assignment.assignment}</td>
                                        <td>{assignment.completionDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
