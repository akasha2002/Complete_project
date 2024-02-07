import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

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
        // console.log(result);

        if (result.success) {
          const type = result.userType;
          // console.log(type);

          switch (type) {
            case 't ':
              console.log("login",username)
              // navigate(`/Student/Dashboard`, { state: username });
              navigate(`/Student/Dashboard`, { state: username });
              break;
            case 't':
              navigate(`/Student/Staff_dashboard`, { state: username });
              break;
            default:
              console.error('Unknown user type:', type);
              break;
          }
        } else {
          // Set state to indicate login error
          setLoginError(true);
        }
      } else {
        // Handle non-OK responses (e.g., server error)
        console.error('Login failed:', response.statusText);

        // Set state to indicate login error
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);

      // Set state to indicate login error
      setLoginError(true);
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
