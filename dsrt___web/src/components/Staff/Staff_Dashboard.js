import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserDetails } from '../Userdetails';
export default function Staff_Dashboard(props) {
    //  console.log(props)
     const { userType, userName } = useUserDetails();
     console.log(userName)
    //  console.log("From sidebar:",userName)
    //  var Username = userName
     //const { state: Username } = useLocation(); 
    //  const { state: { userName } } = useLocation();
    // const location = useLocation();
    // const { Username } = location.state;
    // console.log("Staff_Dashboard Username:",Username)
    const [studentData, setStudentData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStandard, setSelectedStandard] = useState('All');
    const [additionalData, setAdditionalData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [workStatusData, setWorkStatusData] = useState([]);
    // console.log(Username)
    useEffect(() => {
        // Fetch data from the API with the username included in the request
        // console.log("Inside use effect",userName);
        if (userName) {
        fetch('http://localhost:3001/staff_details/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                username: userName
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
        // console.log("Outside use effect",userName);
        fetch('http://localhost:3001/staff_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update studentData state with the fetched data
            setAdditionalData(data.user);
        })
        .catch(error => {
            console.error('Error fetching http://localhost:3001/staff_details :', error);
        });

        //assign 
        fetch('http://localhost:3001/staff_dashboard/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher_id: userName
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update studentData state with the fetched data
            setWorkStatusData(data.users);
        })
        .catch(error => {
            console.error('Error fetching http://localhost:3001/staff_dashboard/status :', error);
        });

    }
    }, [userName]); // Include Username in the dependency array to re-fetch data when it changes
    const getWorkStatus = studentId => {
        const workStatusItem = workStatusData.find(item => item.student_id === studentId);
        return workStatusItem ? workStatusItem.assignment_status : 'Not Assigned';
    };
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
                </div>
        </>
    );
}
