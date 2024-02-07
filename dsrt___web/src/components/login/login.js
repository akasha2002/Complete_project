// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../Userdetails';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');

//   // Use the useUser hook to get access to context values
//   const { setAndStoreUserName, setAndStoreUserType } = useUser();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3001/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result.success) {
//           const type = result.userType;
//           const name = result.userName;
//           setAndStoreUserName(name);
//           setAndStoreUserType(type);

//           switch (type) {
//             case 's':
//               navigate(`/Details/Student_Dashboard`, { state: { username } });
//               break;
//             case 't':
//               navigate(`/Details/Staff_Dashboard`);
//               // navigate(`/Details/Student_Dashboard`, { state: { username } });
//               break;
//             default:
//               console.error('Unknown user type:', type);
//               break;
//           }
//         } else {
//           setLoginError('Invalid username or password');
//         }
//       } else {
//         console.error('Login failed:', response.statusText);
//         setLoginError('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('Error during login');
//     }
//   };

//   return (
//     <>
//       <div className="bg-light min-vh-100 d-flex align-items-center">
//         <div className="container mt-5">
//           <div className="row justify-content-center">
//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-header">
//                   <h3 className="text-center">Login</h3>
//                 </div>
//                 <div className="card-body">
//                   <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                       <label htmlFor="username" className="form-label">Username</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="username"
//                         placeholder="Enter your username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="password" className="form-label">Password</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary">Login</button>
//                     </div>
//                   </form>
//                   {loginError && <p style={{ color: 'red' }}>Invalid username or password</p>}
//                   <div className="text-center mt-3">
//                     <Link to="/Forgot" className="link-secondary">Forgot Password?</Link>
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

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Userdetails';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Use the useUser hook to get access to context values
  const { setAndStoreUserName, setAndStoreUserType } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          const type = result.userType;
          const name = result.userName;
          setAndStoreUserName(name);
          setAndStoreUserType(type);

          switch (type) {
            case 's':
              navigate('/student/Student_Dashboard', { state: { username } });
              break;
            case 't':
              navigate('/Staff/Staff_Dashboard');
              break;
            default:
              console.error('Unknown user type:', type);
              break;
          }
        } else {
          setLoginError('Invalid username or password');
        }
      } else {
        console.error('Login failed:', response.statusText);
        setLoginError('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Error during login');
    }
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex align-items-center">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-center">Login</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>
                  {loginError && <p style={{ color: 'red' }}>Invalid username or password</p>}
                  <div className="text-center mt-3">
                    <Link to="/Forgot" className="link-secondary">Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;