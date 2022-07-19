import { useState, useContext, useEffect } from 'react';
import { register } from '../components/signup';
import { userContext } from '../components/userContext';

export const SignUp = () => {
    const {user} = useContext(userContext);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        if (user) {
            window.location.href = '/records';
        }
    }, [user]);
    return (
        <div className="signup">
            <h1>Register</h1>
            <input type="text" placeholder="Display Name" onChange={(e)=>{setDisplayName(e.target.value)}}/>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button onClick={async()=>{await register(displayName,email,password,confirmPassword)}}>Create My Account</button>
            <span>Already have an account? <a href="/login">Login</a></span>
        </div>
    )
}