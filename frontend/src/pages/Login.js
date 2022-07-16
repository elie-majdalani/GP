import { signInWithGoogle } from './components/firebase';
import { useState } from 'react';
import {login} from './components/login';

const Login = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button onClick={login(email, password)}>Login</button>
            <span>Don't have an account? <a href="/signup">Signup</a></span>
            <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
    )
}

export default Login;