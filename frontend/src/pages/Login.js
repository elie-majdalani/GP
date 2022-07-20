import { signInWithGoogle } from '../components/firebase';
import { useState, useEffect } from 'react';
import { login } from '../components/login';
import { useAppContext } from '../components/userContext';
export const Login = () => {
    const appdata = useAppContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (appdata.user) {
            window.location.href = '/records';
        }
    }, [appdata.user]);
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={async () => { appdata.setUser(await login(email, password)) }}>Login</button>
            <span>Don't have an account? <a href="/signup">Signup</a></span>
            <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
    )
}