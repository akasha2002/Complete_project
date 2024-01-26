import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/Profile';
import ForgotPassword from './components/forgot_pass/Forgot_pass';
import Staff_Dashboard from './components/dashboard/staff_dashboard';

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
        </Routes>
      </Router>
      </>
    );        
}

export default App;
