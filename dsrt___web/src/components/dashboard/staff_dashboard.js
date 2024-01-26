import React, { useState } from 'react';
import './dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library
library.add(fas);

const Staff_Dashboard = (props) => {
    // Retrieve the username from the URL parameters
    const { state: username } = useLocation();
    const handleProfileClick = () => {
        // Navigate to the Profile route with the username as a parameter
        navigate(`/Profile`, { state: { username } });
    };

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Display the logout confirmation modal
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        // Perform logout logic here (e.g., clear user session, navigate to login)
        // For now, just close the modal and navigate to login
        setShowLogoutModal(false);
        navigate('/'); // Navigate to the login page
    };

    const cancelLogout = () => {
        // Close the modal without logging out
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className={`d-flex ${showLogoutModal ? 'blurred' : ''} ${props.isToggled ? 'toggled' : ''}`} id="wrapper">
                <div className={`bg-white`} id="sidebar-wrapper">
                    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><FontAwesomeIcon className="me-2" icon="school" />FX School</div>
                    <div className="list-group list-group-flush my-3">
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                            className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-project-diagram me-2"></i>Projects</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-chart-line me-2"></i>Analytics</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-paperclip me-2"></i>Reports</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-shopping-cart me-2"></i>Store Mng</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-gift me-2"></i>Products</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-comment-dots me-2"></i>Chat</a>
                        <a href="" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-map-marker-alt me-2"></i>Outlet</a>
                        <a className="list-group-item list-group-item-action bg-transparent text-danger fw-bold cursor-pointer" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-power-off me-2"></i>Logout</a>
                    </div>
                </div>
                <div id="page-content-wrapper" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" onClick={props.handleToggle} id="menu-toggle"></i>
                            <h2 className="fs-2 m-0">Staff_Dashboard</h2>
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
                                        <i className="fas fa-user me-2"></i>{username}
                                    </a>
                                    <ul className="dropdown-menu" style={{ cursor: 'pointer' }} aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" onClick={handleProfileClick} >Profile</a></li>
                                        <li><a className="dropdown-item" onClick={handleLogout} >Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid px-4">
                        <div className="row g-3 my-2">
                            <div className="col-md-3">
                                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">720</h3>
                                        <p className="fs-5">Products</p>
                                    </div>
                                    <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">4920</h3>
                                        <p className="fs-5">Sales</p>
                                    </div>
                                    <i
                                        className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">3899</h3>
                                        <p className="fs-5">Delivery</p>
                                    </div>
                                    <i className="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">%25</h3>
                                        <p className="fs-5">Increase</p>
                                    </div>
                                    <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Recent Orders</h3>
                            <div className="col">
                                <table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="50">#</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Television</td>
                                            <td>Jonny</td>
                                            <td>$1200</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Laptop</td>
                                            <td>Kenny</td>
                                            <td>$750</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Cell Phone</td>
                                            <td>Jenny</td>
                                            <td>$600</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Fridge</td>
                                            <td>Killy</td>
                                            <td>$300</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Books</td>
                                            <td>Filly</td>
                                            <td>$120</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>Gold</td>
                                            <td>Bumbo</td>
                                            <td>$1800</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td>Pen</td>
                                            <td>Bilbo</td>
                                            <td>$75</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td>Notebook</td>
                                            <td>Frodo</td>
                                            <td>$36</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">9</th>
                                            <td>Dress</td>
                                            <td>Kimo</td>
                                            <td>$255</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">10</th>
                                            <td>Paint</td>
                                            <td>Zico</td>
                                            <td>$434</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">11</th>
                                            <td>Carpet</td>
                                            <td>Jeco</td>
                                            <td>$1236</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">12</th>
                                            <td>Food</td>
                                            <td>Haso</td>
                                            <td>$422</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal ${showLogoutModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Logout Confirmation</h5>
                            <button type="button" className="close" onClick={cancelLogout}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to logout, {username}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cancelLogout}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={confirmLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Staff_Dashboard;
