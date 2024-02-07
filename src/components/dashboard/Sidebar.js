import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function Sidebar(props) {
    return (
        <>
            <div className={`bg-white`} id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><FontAwesomeIcon className="me-2" icon="school" />FX School</div>
                <div className="list-group list-group-flush my-3">
                    <Link to="Dashboard" onClick={() => {props.handleLinkClick('Dashboard');}} className="list-group-item list-group-item-action bg-transparent second-text active"><i
                        className="fas fa-tachometer-alt me-2"></i>Dashboard</Link>
                    <Link to="Assigned_work" onClick={() => { props.handleLinkClick('Assigned work');}} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                        <i className="fas fa-project-diagram me-2"></i>Assigned work
                    </Link>
                    <Link to="Completed_work" onClick={() => { props.handleLinkClick('Completed work');}} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                        <i className="fas fa-chart-line me-2"></i>Completed work
                    </Link>
                    <Link to="Reward" onClick={() => { props.handleLinkClick('Rewards');}} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                        <i className="fas fa-gift me-2"></i>Rewards
                    </Link>
                    <Link to="Staff_dashboar" onClick={() => { props.handleLinkClick('Rewards');}} className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}>
                        <i className="fas fa-gift me-2"></i>Staff_dashboard
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-transparent text-danger fw-bold cursor-pointer" onClick={props.handleLogout} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-power-off me-2"></i>Logout</Link>
                </div>
            </div>
        </>
    )
}
