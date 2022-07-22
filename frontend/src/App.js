
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
import firebase from './components/firebase';
// import { checkGmail, saveGmail } from './components/gmail';
import { Home } from './pages/Home';
import { Records } from './pages/Records';
import { Wallet } from './pages/Wallet';
import { useAppContext } from './components/userContext';
import Support from './pages/Support';

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
  const appdata = useAppContext();
  const db = firebase.firestore();
  return (
    appdata.user && appdata.user.role === 'support' ?
      (<Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Support db={db}/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>)
      :
      (<Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Records />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wallet" element={<Wallet db={db}/>} />
          </Routes>
        </div>
      </Router>)
  );
}

export default App;
