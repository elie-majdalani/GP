import { signInWithGoogle } from '../components/firebase';
import { useState, useEffect } from 'react';
import { login } from '../components/login';
import { useAppContext } from '../components/userContext';
import logo from '../assets/logo.png';
export const Login = () => {
    const appdata = useAppContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (appdata.user) {
            if (appdata.user.role === "user") {
                window.location.href = '/records';
            }
            if (appdata.user.role === "support") {
                window.location.href = '/';
            }

        }
    }, [appdata.user]);
    return (
        <div className='login-page-main-div'>
            <div className='login-page-header-div'>
                <img id='logo' src={logo} alt='logo' />
            </div>

            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={async () => {
                    const userData = await login(email, password)
                    appdata.setUser(userData);
                }}>Login</button>
                <span>Don't have an account? <a href="/signup">Signup</a></span>
                <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
            </div>
        </div>
    )
}