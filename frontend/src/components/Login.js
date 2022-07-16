import { signInWithGoogle } from './firebase';
import { useState } from 'react';

const Login = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const res = await fetch("http://127.0.0.1:4001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const user = await res.json();
            if (user.token) {
                localStorage.setItem('token', user.token);
                setUser(user)
            }}
        catch (err) {
            console.log(err);
        }}
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button onClick={login}>Login</button>
            <span>Don't have an account? <a href="/signup">Signup</a></span>
            <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
    )
}

export default Login;