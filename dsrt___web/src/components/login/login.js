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

      // if (response.ok) {
      //   // Navigate to the dashboard after successful login
      //   navigate(`/Dashboard`, { state: username });
      // } 
  //     else {
  //       // Set state to indicate login error
  //       setLoginError(true);
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  if (response.ok) {
    const result = await response.json();
    console.log(result)    

    if (result.success) {

      // Assuming the API returns a user type
      const type = result.userType;
      console.log(type)  

      // Navigate based on the user type
      switch (type) {
        case 's':   
          // console.log("vmvb")
          navigate(`/Dashboard`,{ state: username });
          break;
        case 'a':
          navigate(`/Staff_Dashboard`, { state: username });
          break;
        // Add more cases for different user types as needed

        default:
          // Handle unknown user type
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
  }
} catch (error) {
  console.error('Error during login:', error);
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
