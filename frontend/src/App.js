import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userContext } from './components/userContext';
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
// import firebase from './components/firebase';
// import { checkGmail, saveGmail } from './components/gmail';
import { Home } from './pages/Home';
import { Records } from './pages/Records';

function App() {
  const [user, setUser] = useState(false);

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
    <userContext.Provider value={{ user, setUser }}>
      {<Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/records" element={<Records />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>}
    </userContext.Provider>
  );
}

export default App;
