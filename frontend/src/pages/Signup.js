import { useState, useEffect } from 'react';
import { register } from '../components/signup';
import { useAppContext } from '../components/userContext';
import logo from '../assets/logo.png';

export const SignUp = () => {
    const appdata = useAppContext();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        if (appdata.user) {
            window.location.href = '/records';
        }
    }, [appdata.user]);
    return (
        <div className="signup-page-main-div">
            <div className='signup-page-header-div'>
                <img id='logo' src={logo} alt='logo' />
            </div>

            <h1>Register</h1>
            <input type="text" placeholder="Display Name" onChange={(e) => { setDisplayName(e.target.value) }} />
            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <input type="password" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
            <button onClick={async () => { await register(displayName, email, password, confirmPassword) }}>Create My Account</button>
            <span>Already have an account? <a href="/login">Login</a></span>
        </div>
    )
}