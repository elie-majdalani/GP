import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
