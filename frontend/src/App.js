import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
// import firebase from './components/firebase';
// import { checkGmail, saveGmail } from './components/gmail';
import { Home } from './pages/Home';
import { Records } from './pages/Records';
import { Wallet } from './pages/Wallet';

function App() {
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     setUser(user);
  //     if (user) {
  //       const valid = checkGmail();
  //       if (valid) {
  //         saveGmail();
  //     }
  //   }
  // })}, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/records" element={<Records />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
