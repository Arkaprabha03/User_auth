import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './Login';
import Register from './Register';
import UserList from './UserList';
const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/users" element={<UserList />}/>
      </Routes>
    </Router>
  )

};

export default App;
