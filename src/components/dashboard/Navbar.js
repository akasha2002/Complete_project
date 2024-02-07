import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    // /console.log(props.currentHeading)
    // console.log(props.userData)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="d-flex align-items-center">
                    <i className="fas fa-align-left primary-text fs-4 me-3" onClick={props.handleToggle} id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">{props.currentHeading}</h2>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle second-text fw-bold" href="/" id="navbarDropdown"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user me-2"></i>{props.userData?.student_name}
                            </a>
                            <ul className="dropdown-menu" style={{ cursor: 'pointer' }} aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" onClick={props.handleProfileClick}>Profile</a></li>
                                <li><Link className="dropdown-item" onClick={props.handleLogout}>Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
