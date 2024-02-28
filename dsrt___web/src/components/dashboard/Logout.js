import React, { useState } from 'react';
import './dashboard.css';
import { useAuth } from '../Logout/Authlogout';

export default function Logout() {

    const { showLogoutModal, confirmLogout, cancelLogout } = useAuth();
    

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
        </>
    );
}
