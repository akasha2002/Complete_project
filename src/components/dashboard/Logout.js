import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './dashboard.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Logout() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('handleLogout');
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        console.log('confirmLogout');
        setShowLogoutModal(false);
        navigate('/');
    };

    const cancelLogout = () => {
        console.log('cancelLogout');
        setShowLogoutModal(false);
    };

    return (
        <>
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
                            <p>Are you sure you want to logout?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cancelLogout}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route element={<Navbar handleToggle={handleToggle} handleLogout={handleLogout} />}/>
                <Route element={<Sidebar handleLogout={handleLogout} />} />
            </Routes>


        </>
    );
}
