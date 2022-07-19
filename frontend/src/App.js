import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userContext } from './components/userContext';
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
const [user, setUser] = useState(false);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {user?
        <Router>
          <div>
            {console.log(user)}
            <button onClick={()=>{setUser(null)}}>Logout</button> 
          </div>
          <Routes> {/* <Route path="/" element={<Home />} /> */} </Routes>
        </Router>
      :<Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </div>
        </Router>}

    </userContext.Provider>
  );
}

export default App;
