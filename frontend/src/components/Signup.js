import { useState } from 'react';

const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await fetch("http://127.0.0.1:4001/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    displayName,
                    email,
                    password,
                })
            });
            const data = await res.json();
            if (data.status === 'success') {
                localStorage.setItem('token', data.data);
                setSignUp(false)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="signup">
            <h1>Register</h1>
            <input type="text" placeholder="Display Name" onChange={(e)=>{setDisplayName(e.target.value)}}/>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button onClick={register}>Create My Account</button>
            <span>Already have an account? <a href="/login">Login</a></span>
        </div>
    )
}
export default SignUp;