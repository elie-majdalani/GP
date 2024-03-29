import { signInWithGoogle } from '../components/firebase';
import { useState, useEffect } from 'react';
import { login } from '../components/Login';
import { useAppContext } from '../components/UserContext';
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

            <div className="login-section-div">
                <h1>Login</h1>
                <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <button id="main-btn" onClick={async () => {
                    const userData = await login(email, password)
                    appdata.setUser(userData);
                }}>Login</button>
                <span>Don't have an account? <a href="/signup">Signup</a></span>
            </div>
        </div>
    )
}