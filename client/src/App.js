import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Page/Login';
import Register from './Page/Register';
import PersonalInfo from './Page/PersonalInfo';
import Profile from './Page/Profile';
import UploadAvatar from './Page/UploadAvatar';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/personalinfo' element={<PersonalInfo />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/avatar' element={<UploadAvatar />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
