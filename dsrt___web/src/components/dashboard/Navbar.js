import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Logout/Authlogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function Navbar(props) {
    const { handleLogout } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Function to format time to 12-hour format with AM/PM and seconds
    const formatTime = (time) => {
        return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" onClick={props.handleToggle} id="menu-toggle"></i>
                        <h2 className="fs-2 m-0" style={{ color: '#0757bffd' }}>{props.currentHeading}</h2>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <div className="me-3" style={{ color: '#0757bffd', fontSize: '1.5rem' }}>{formatTime(currentTime)}</div>
                        <a className="nav-link dropdown-toggle second-text fw-bold" href="/" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon="user" size="lg" className="me-2" />
                            {props.userData?.student_name}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" style={{ cursor: 'pointer' }} aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" onClick={props.handleProfileClick}> <FontAwesomeIcon className="me-2" icon="user" />Profile</a></li>
                            <li><Link className="dropdown-item" onClick={handleLogout} ><FontAwesomeIcon className="me-2" icon="sign-out" />Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}