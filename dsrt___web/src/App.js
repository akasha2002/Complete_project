// // import './App.css';
// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Login from './components/login/login';
// // import Dashboard from './components/dashboard/dashboard';
// // import Profile from './components/profile/Profile';
// // import ForgotPassword from './components/forgot_pass/Forgot_pass';
// // import Staff_Dashboard from './components/dashboard/staff_dashboard';

// // function App() {

// //     const [isToggled, setIsToggled] = useState(false);
  

// //     const handleToggle = () => {
// //       console.log('Toggle clicked');
// //       setIsToggled(!isToggled);
// //     }

// //     return (
// //       <>
// //       <Router>
// //         <Routes>
// //           <Route exact path="/" element={<Login/>} />
// //           <Route exact path="/Dashboard" element={<Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
// //           <Route exact path="/Staff_Dashboard" element={<Staff_Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
// //           <Route exact path="/Profile" element={<Profile/>} />
// //           <Route exact path="/Forgot" element={<ForgotPassword/>} />
// //         </Routes>
// //       </Router>
// //       </>
// //     );        
// // }

// // export default App;
// import './App.css';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/login/login';
// import Dashboard from './components/dashboard/dashboard';
// import Profile from './components/profile/Profile';
// import ForgotPassword from './components/forgot_pass/Forgot_pass';
// import Staff_Dashboard from './components/dashboard/staff_dashboard';
// // import Completed_work from './components/student/completed_work';
// // import Reward from './components/student/reward';
// // import Assigned_work from './components/student/assigned_work';
// import Navbar from './components/dashboard/navbar';

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isToggled, setIsToggled] = useState(false);
  

//     const handleToggle = () => {
//       console.log('Toggle clicked');
//       setIsToggled(!isToggled);
//     }

//     const handleLoginSuccess = () => {
//       setIsLoggedIn(true);
//   };

//     return (
//       <>
//       <Router>
//       {isLoggedIn && (
//                     <>
//                         <Navbar isToggled={isToggled} handleToggle={handleToggle}/>
//                         {/* <Sidebar isToggled={isToggled} handleToggle={handleToggle} /> */}
//                     </>
//                 )}
//         <Routes>
//           <Route exact path="/" element={<Login onLogin={handleLoginSuccess}/>} />
//           <Route exact path="/Dashboard" element={<Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
//           <Route exact path="/Staff_Dashboard" element={<Staff_Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
//           <Route exact path="/Profile" element={<Profile/>} />
//           <Route exact path="/Forgot" element={<ForgotPassword/>} />
//           {/* <Route exact path="/Completed_work" element={<Completed_work/>} />
//           <Route exact path="/Reward" element={<Reward/>} />
//           <Route exact path="/Assigned_work" element={<Assigned_work/>} /> */}
//         </Routes>
//       </Router>
//       </>
//     );        
// }

// export default App;

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/Profile';
import ForgotPassword from './components/forgot_pass/Forgot_pass';
import Staff_Dashboard from './components/dashboard/staff_dashboard';
import Completed_work from './components/student/completed_work';
import Reward from './components/student/reward';
import Assigned_work from './components/student/assigned_work';

function App() {

    const [isToggled, setIsToggled] = useState(false);
  

    const handleToggle = () => {
      console.log('Toggle clicked');
      setIsToggled(!isToggled);
    }

    return (
      <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/Dashboard" element={<Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
          <Route exact path="/Staff_Dashboard" element={<Staff_Dashboard isToggled={isToggled} handleToggle={handleToggle} />} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/Forgot" element={<ForgotPassword/>} />
          <Route exact path="/Completed_work" element={<Completed_work/>} />
          <Route exact path="/Reward" element={<Reward/>} />
          <Route exact path="/Assigned_work" element={<Assigned_work/>} />
        </Routes>
      </Router>
      </>
    );        
}

export default App;