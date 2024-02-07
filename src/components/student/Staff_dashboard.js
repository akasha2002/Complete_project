// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// export default function Staff_Dashboard(props) {
//     const { state : Username} = useLocation();
//     // console.log(Username)
//     const studentDetails = {};
//     const [studentData, setStudentData] = useState([]);
//     useEffect(() => {
//         // Define the request body
//         const requestBody = {
//             // Assuming your API expects the username in a specific field
//             username: Username
//         };

//         // Fetch data from the API with the username included in the request body
//         fetch('http://localhost:3001/staff_details/students', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody)
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Update tableData state with the fetched data
//             setStudentData(data.user);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }, [Username]);
//     const headings = ["Sd-Id", "Name", "Student Status", "Work Assigned", "Work Completed"];

//     // Sample data for the table
//     // const tableData = [
//     //     { data1: "Data 1", data2: "Data 2", data3: "Data 3", data4: "Data 4", data5: "Data 5" },
//         // Add more rows as needed
//     // ];

//     // return (
//     //     <>
//     //         <div className="container-fluid px-2">
//     //             <div className="row g-3 my-2">
//     //                 <div className="col-md-2 p-2">
//     //                     <div className="p-2 bg-primary text-white shadow-sm d-flex flex-column align-items-center rounded">
//     //                         <div className="d-flex flex-row align-items-center">
//     //                             <h3 className="fs-6 mt-2">
//     //                                 {studentDetails.grade}
//     //                             </h3>
//     //                             <p className="fs-5">Class</p>
//     //                         </div>
//     //                         <div className="dropdown mt-2">
//     //                             <button
//     //                                 className="btn btn-secondary dropdown-toggle"
//     //                                 type="button"
//     //                                 id="dropdownMenuButton1"
//     //                                 data-bs-toggle="dropdown"
//     //                                 aria-expanded="false"
//     //                             >
//     //                                 Options
//     //                             </button>
//     //                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//     //                                 <li><a className="dropdown-item" href="#">Action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Another action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Something else here</a></li>
//     //                             </ul>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //                 <div className="col-md-2 p-2">
//     //                     <div className="p-2 bg-primary text-white shadow-sm d-flex flex-column align-items-center rounded">
//     //                         <div className="d-flex flex-row align-items-center">
//     //                             <h3 className="fs-6 mt-2">
//     //                                 {/* Details specific to the second container */}
//     //                             </h3>
//     //                             <p className="fs-5">Section</p>
//     //                         </div>
//     //                         <div className="dropdown mt-2">
//     //                             <button
//     //                                 className="btn btn-secondary dropdown-toggle"
//     //                                 type="button"
//     //                                 id="dropdownMenuButton2"
//     //                                 data-bs-toggle="dropdown"
//     //                                 aria-expanded="false"
//     //                             >
//     //                                 Options
//     //                             </button>
//     //                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
//     //                                 <li><a className="dropdown-item" href="#">Action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Another action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Something else here</a></li>
//     //                             </ul>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //                 <div className="col-md-2 p-2">
//     //                     <div className="p-2 bg-primary text-white shadow-sm d-flex flex-column align-items-center rounded">
//     //                         <div className="d-flex flex-row align-items-center">
//     //                             <h3 className="fs-6 mt-2">
//     //                                 {/* Details specific to the third container */}
//     //                             </h3>
//     //                             <p className="fs-5">Subject</p>
//     //                         </div>
//     //                         <div className="dropdown mt-2">
//     //                             <button
//     //                                 className="btn btn-secondary dropdown-toggle"
//     //                                 type="button"
//     //                                 id="dropdownMenuButton3"
//     //                                 data-bs-toggle="dropdown"
//     //                                 aria-expanded="false"
//     //                             >
//     //                                 Options
//     //                             </button>
//     //                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
//     //                                 <li><a className="dropdown-item" href="#">Action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Another action</a></li>
//     //                                 <li><a className="dropdown-item" href="#">Something else here</a></li>
//     //                             </ul>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>

//     //             <div className="row my-5">
//     //                 <div className="col">
//     //                     <table className="table bg-white rounded shadow-sm table-hover">
//     //                         <thead>
//     //                             <tr>
//     //                                 {headings.map((heading, index) => (
//     //                                     <th key={index}>{heading}</th>
//     //                                 ))}
//     //                             </tr>
//     //                         </thead>
//     //                         <tbody>
//     //                             {tableData.map((rowData, rowIndex) => (
//     //                                 <tr key={rowIndex}>
//     //                                     <td>{rowData.data1}</td>
//     //                                     <td>{rowData.data2}</td>
//     //                                     <td>{rowData.data3}</td>
//     //                                     <td>{rowData.data4}</td>
//     //                                     <td>{rowData.data5}</td>
//     //                                 </tr>
//     //                             ))}
//     //                         </tbody>
//     //                     </table>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </>
//     // );
//     return (
//         <>
//             <div className="container-fluid px-2">
//                 {/* Your other JSX code */}
//                 <div className="row my-5">
//                     <div className="col">
//                         <table className="table bg-white rounded shadow-sm table-hover">
//                             <thead>
//                                 <tr>
//                                     {headings.map((heading, index) => (
//                                         <th key={index}>{heading}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {tableData.map((rowData, rowIndex) => (
//                                     <tr key={rowIndex}>
//                                         {/* Assuming your API response has properties data1, data2, data3, data4, data5 */}
//                                         <td>{rowData.data1}</td>
//                                         {/* <td>{rowData.data2}</td>
//                                         <td>{rowData.data3}</td>
//                                         <td>{rowData.data4}</td>
//                                         <td>{rowData.data5}</td> */}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function Staff_Dashboard(props) {
//     const { state: Username } = useLocation();
//     const [studentData, setStudentData] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [selectedStandard, setSelectedStandard] = useState('All');
//     const [additionalData, setAdditionalData] = useState([]);

//     useEffect(() => {
//         // Fetch data from the API with the username included in the request
//         fetch('http://localhost:3001/staff_details/students', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: Username
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Update studentData state with the fetched data
//             setStudentData(data.user);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });

//         fetch('http://localhost:3001/staff_details', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: Username
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Update studentData state with the fetched data
//             setAdditionalData(data.user);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }, [Username]); // Include Username in the dependency array to re-fetch data when it changes
//     // Include Username in the dependency array to re-fetch data when it changes
//     const filteredStudents = studentData.filter(student => {
//         if (selectedCategory !== 'All' && student.category !== selectedCategory) {
//             return false;
//         }
//         if (selectedStandard !== 'All' && student.Student_standard !== selectedStandard) {
//             return false;
//         }
//         return true;
//     });

//     // Get unique categories and standards from the student data
//     const categories = [...new Set(studentData.map(student => student.category))];
//     const standards = [...new Set(studentData.map(student => student.Student_standard))];

//     return (
//         <>
//             <div className="container-fluid px-2">
//                 {/* Dropdown button to select category */}
//                 {/* <h4>Staff Name :{additionalData.staff_name}</h4> */}
//                 <div className="dropdown mb-3">
//                     <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                         Category: {selectedCategory}
//                     </button>
//                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                         {/* Display categories as dropdown options */}
//                         <li key="All" onClick={() => setSelectedCategory('All')}><a className="dropdown-item">All</a></li>
//                         {categories.map((category, index) => (
//                             <li key={index} onClick={() => setSelectedCategory(category)}><a className="dropdown-item">{category}</a></li>
//                         ))}
//                     </ul>
//                 </div>
//                 {/* Toggle button to select standard */}
//                 <div className="btn-group mb-3" role="group" aria-label="Basic example">
//                     <button type="button" className={`btn ${selectedStandard === 'All' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedStandard('All')}>All Standards</button>
//                     {standards.map((standard, index) => (
//                         <button key={index} type="button" className={`btn ${selectedStandard === standard ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedStandard(standard)}>{standard}</button>
//                     ))}
//                 </div>
//                 {/* Your other JSX code */}
//                 <div className="row my-5">
//                     <div className="col">
//                         <table className="table table-bordered table-striped">
//                             <thead className="bg-primary text-white">
//                                 <tr>
//                                     <th>Student ID</th>
//                                     <th>Student Name</th>
//                                     <th>Standard</th>
//                                     <th>Category</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredStudents.map((student, index) => (
//                                     <tr key={index}>
//                                         <td>{student.student_id}</td>
//                                         <td>{student.student_name}</td>
//                                         <td>{student.Student_standard}</td>
//                                         <td>{student.category}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Staff_Dashboard(props) {
    const { state: Username } = useLocation();
    const [studentData, setStudentData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStandard, setSelectedStandard] = useState('All');
    const [additionalData, setAdditionalData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        // Fetch data from the API with the username included in the request
        fetch('http://localhost:3001/staff_details/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update studentData state with the fetched data
            setStudentData(data.user);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        fetch('http://localhost:3001/staff_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update studentData state with the fetched data
            setAdditionalData(data.user);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [Username]); // Include Username in the dependency array to re-fetch data when it changes
    console.log("User",Username)
    // Filter students based on selected category and standard
    const filteredStudents = studentData.filter(student => {
        if (selectedCategory !== 'All' && student.category !== selectedCategory) {
            return false;
        }
        if (selectedStandard !== 'All' && student.Student_standard !== selectedStandard) {
            return false;
        }
        if (searchKeyword && !student.student_name.toLowerCase().includes(searchKeyword.toLowerCase())) {
            return false;
        }
        return true;
    });

    // Get unique categories and standards from the student data
    const categories = [...new Set(studentData.map(student => student.category))];
    const standards = [...new Set(studentData.map(student => student.Student_standard))];

    return (
        <>
            <div className="container-fluid px-2">
                {/* Dropdown button to select category */}
                {/* <h4>Staff Name :{additionalData.staff_name}</h4> */}
                <div className="dropdown mb-3">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Category: {selectedCategory}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {/* Display categories as dropdown options */}
                        <li key="All" onClick={() => setSelectedCategory('All')}><a className="dropdown-item">All</a></li>
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => setSelectedCategory(category)}><a className="dropdown-item">{category}</a></li>
                        ))}
                    </ul>
                    
                </div>
                {/* Toggle button to select standard */}
                <div className="btn-group mb-3" role="group" aria-label="Basic example">
                    <button type="button" className={`btn ${selectedStandard === 'All' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedStandard('All')}>All Standards</button>
                    {standards.map((standard, index) => (
                        <button key={index} type="button" className={`btn ${selectedStandard === standard ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedStandard(standard)}>{standard}</button>
                    ))}
                </div>
                {/* Search button */}
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
                        onClick={() => setSearchKeyword('')}
                    >
                        Clear
                    </button>
                </div>
                {/* Your other JSX code */}
                <div className="row my-5">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Standard</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.student_id}</td>
                                        <td>{student.student_name}</td>
                                        <td>{student.Student_standard}</td>
                                        <td>{student.category}</td>
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

