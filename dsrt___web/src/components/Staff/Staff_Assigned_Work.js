import React from 'react'

export default function Staff_Assigned_Work() {
  const assignments = [
    { student_id: 1, student_name: 'sam', title: 'Math Assignment', description: 'Solve problems from Chapter 3', dueDate: '2024-04-15', Statud: 'Completed' },
    { student_id: 2, student_name: 'vikram', title: 'Science Project', description: 'Create a presentation on the solar system', dueDate: '2024-04-20' },
    // Add more assignments as needed
  ];

  // const { userType, userName } = useUserDetails();
  // console.log(userType)
  // console.log(userName)

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Assignment Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Student_id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{assignments[0].id}</th>

            <td>{assignments[0].title}</td>
            <td>{assignments[0].description}</td>
            <td>{assignments[0].dueDate}</td>
          </tr>
          <tr>
            <th scope="row">{assignments[1].id}</th>

            <td>{assignments[1].title}</td>
            <td>{assignments[1].description}</td>
            <td>{assignments[1].dueDate}</td>
          </tr>
          {/* Add more rows for additional assignments */}
        </tbody>
      </table>
    </div>
  );
}
