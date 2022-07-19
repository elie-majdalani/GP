import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userContext } from './components/userContext';
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Table } from './pages/Table';

function App() {
  const [user, setUser] = useState(false);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {<Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/table" element={<Table />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>}
    </userContext.Provider>
  );
}

export default App;
