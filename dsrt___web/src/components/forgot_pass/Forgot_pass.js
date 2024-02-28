import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePasswordRequest = async () => {
    try {
      // const response = await axios.post('http://192.168.1.2:3001/api/request_password_change', { email });
      const response = await axios.post('http://localhost:3001/api/request_password_change', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error requesting password change:', error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  const handleVerifyEmailAndChangePassword = async () => {
    try {
      // const response = await axios.post('http://192.168.1.2:3001/api/verify_email_and_change_password', { email, verificationToken, newPassword });
      const response = await axios.post('http://localhost:3001/api/verify_email_and_change_password', { email, verificationToken, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error verifying email and changing password:', error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '20px', backgroundColor: '#35aaf3' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="change-password-container p-3 mb-4" style={{ width: '100%', backgroundColor: '#fff' }}>
          <div style={{ backgroundColor: '#0082c8', color: '#fff', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
            <h2 className="text-center mb-0">Change Password</h2>
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary w-100" style={{ backgroundColor: '#0082c8' }} onClick={handleChangePasswordRequest}>Request Password Change</button>
          </div>
          <hr className="mb-4" />
          <div className="mb-3">
            <label className="form-label">Verification One Time Password:</label>
            <input type="text" className="form-control" value={verificationToken} onChange={(e) => setVerificationToken(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary w-100" style={{ backgroundColor: '#0082c8' }} onClick={handleVerifyEmailAndChangePassword}>Verify Email and Change Password</button>
          </div>
          {message && <div className="alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;