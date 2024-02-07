// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [resetSent, setResetSent] = useState(false);

//   const handleResetPassword = (e) => {
//     e.preventDefault();

//     // TODO: Implement password reset logic, for now, just simulate a reset sent
//     setResetSent(true);
//   };

//   return (
//     <>
//       <div className="bg-light min-vh-100 d-flex align-items-center">
//         <div className="container mt-5">
//           <div className="row justify-content-center">
//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-header">
//                   <h3 className="text-center">Forgot Password</h3>
//                 </div>
//                 <div className="card-body">
//                   {!resetSent ? (
//                     <form onSubmit={handleResetPassword}>
//                       <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           id="email"
//                           placeholder="Enter your email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>
//                       <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">Reset Password</button>
//                       </div>
//                     </form>
//                   ) : (
//                     <div className="text-center">
//                       <p>An email with password reset instructions has been sent to {email}.</p>
//                     </div>
//                   )}
//                   <div className="text-center mt-3">
//                     <Link to="/" className="link-secondary">Back to Login</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ForgotPassword;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [verificationToken, setVerificationToken] = useState('');
//   const [message, setMessage] = useState('');

//   const handleChangePasswordRequest = async () => {
//     try {
//       const response = await axios.post('/api/request_password_change', { email });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error requesting password change:', error.response.data.error);
//       setMessage(error.response.data.error);
//     }
//   };

//   const handleVerifyEmailAndChangePassword = async () => {
//     try {
//       const response = await axios.post('/api/verify_email_and_change_password', { email, verificationToken, newPassword });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error verifying email and changing password:', error.response.data.error);
//       setMessage(error.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h2>Change Password</h2>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </div>
//       <div>
//         <button onClick={handleChangePasswordRequest}>Request Password Change</button>
//       </div>
//       <hr />
//       <div>
//         <label>Verification Token:</label>
//         <input type="text" value={verificationToken} onChange={(e) => setVerificationToken(e.target.value)} />
//       </div>
//       <div>
//         <label>New Password:</label>
//         <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//       </div>
//       <div>
//         <button onClick={handleVerifyEmailAndChangePassword}>Verify Email and Change Password</button>
//       </div>
//       {message && <div>{message}</div>}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePasswordRequest = async () => {
    try {
      // console.log("aaaaa")
      const response = await axios.post('http://localhost:3001/api/request_password_change', { email });
      // console.log(response+response+response)
      setMessage(response.data.message);
      // console.log(response.data)
    } catch (error) {
      console.error('Error requesting password change:', error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  const handleVerifyEmailAndChangePassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/verify_email_and_change_password', { email, verificationToken, newPassword });
      console.log(verificationToken)
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error verifying email and changing password:', error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Change Password</h2>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleChangePasswordRequest}>Request Password Change</button>
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
        <button className="btn btn-primary" onClick={handleVerifyEmailAndChangePassword}>Verify Email and Change Password</button>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default ForgotPassword;