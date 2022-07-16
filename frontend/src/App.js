import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </header>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
