import React, { useState, useEffect, forwardRef } from 'react';
import './dashboard.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Logout/Authlogout';
import { useUserDetails } from '../Userdetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Sidebar = forwardRef((props, ref) => {
    const { handleLogout } = useAuth();
    const { userType, userName } = useUserDetails();
    const location = useLocation();

    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const path = location.pathname;
        const parts = path.split("/");
        setActiveLink(parts[parts.length - 1]);
    }, [location.pathname]);

    useEffect(() => {
        // Close sidebar whenever location changes
        props.setIsToggled(false);
    }, [location.pathname]);

    return (
        <>
            <div className={`bg-white`} id="sidebar-wrapper" ref={ref}>
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
                    <img
                        // src="https://www.fxschool.ac.in/cs-content/themes/fxcbse/assets/img/FX_LOGO.png"
                        src={process.env.PUBLIC_URL + '/fx.jpg'}
                        alt="FX School Logo"
                        className="me-2"
                        style={{ width: '190px', height: '50px' }}
                    />
                </div>
                <div className="list-group list-group-flush">
                    {userType === 's' && (
                        <>
                            <Link
                                to="/student/Student_Dashboard"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Student_Dashboard' ? 'active' : ''}`}
                            >
                                <i className="fas fa-user-graduate me-2"></i>Student Dashboard
                            </Link>
                            <Link
                                to="/student/Student_Assigned_work"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Student_Assigned_work' || activeLink === 'Assignment_submission' ? 'active' : ''}`}
                            >
                                <i className="fas fa-tasks me-2"></i>Assigned work
                            </Link>
                            <Link
                                to="/student/Student_Assigned_material"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Student_Assigned_material' || activeLink === 'Assignment_submission' ? 'active' : ''}`}
                            >
                                <i className="fas fa-book me-2"></i>Assigned Material
                            </Link>
                            <Link
                                to="/student/Student_Completed_work"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Student_Completed_work' ? 'active' : ''}`}
                            >
                                <i className="fas fa-check-circle me-2"></i>Completed work
                            </Link>
                            <Link
                                to="/student/Student_Reward"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Student_Reward' ? 'active' : ''}`}
                            >
                                <i className="fas fa-gift me-2"></i>Rewards
                            </Link>
                        </>
                    )}
                    {userType === 't' && (
                        <>
                            <Link
                                to="/Staff/Staff_Dashboard"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Dashboard' ? 'active' : ''}`}
                            >
                                <i className="fas fa-chalkboard-teacher me-2"></i>Staff Dashboard
                            </Link>
                            <Link
                                to="/Staff/Staff_Assign_Work"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Assign_Work' ? 'active' : ''}`}
                            >
                                <i className="fas fa-tasks me-2"></i>Assign Work
                            </Link>
                            <Link
                                to="/Staff/Staff_Assign_material"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Assign_material' ? 'active' : ''}`}
                            >
                                <i className="fas fa-tasks me-2"></i>Assign Material
                            </Link>
                            <Link
                                to="/Staff/Staff_Material_analysis"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Material_analysis' || activeLink === 'Staff_Material_status' ? 'active' : ''}`}
                            >
                                <i className="fas fa-tasks me-2"></i>Material Analysis
                            </Link>
                            <Link
                                to="/Staff/Staff_Assigned_Work"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Assigned_Work' || activeLink === 'Staff_work_view' ? 'active' : ''}`}
                            >
                                <i className="fas fa-clipboard-check me-2"></i>Assigned Work
                            </Link>
                            <Link
                                to="/Staff/Staff_Completed_Work"
                                className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Staff_Completed_Work' || activeLink === 'Completed_work_view' ? 'active' : ''}`}
                            >
                                <i className="fas fa-check-circle me-2"></i>Completed Work
                            </Link>
                        </>
                    )}
                    <Link
                        to="Profile"
                        className={`list-group-item list-group-item-action bg-transparent second-text fw-bold ${activeLink === 'Profile' ? 'active' : ''}`}
                    >
                        <i className="fas fa-user me-2"></i>Profile
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-transparent text-danger fw-bold cursor-pointer" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-power-off me-2"></i>Logout</Link>
                </div>
            </div>
        </>
    );
});

export default Sidebar;
