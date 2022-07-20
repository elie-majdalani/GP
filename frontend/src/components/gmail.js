// import { useContext } from "react";
// import { useAppContext } from '../components/userContext';
    
export const saveGmail = async () => {
    const res = await fetch("http://127.0.0.1:4001/gmailRegister", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            displayName: user.user.displayName,
            email: user.user.email,
            photoUrl: user.user.photoURL
        })
    })
    const token = await res.json();
    localStorage.setItem('token', token.token);
}

export const checkGmail = async () => {
    const res = await fetch("http://127.0.0.1:4001/gmail", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            email: user.email
        })
    })
    if (res.status === 201) {
        return true;
    }
    const token = await res.json();
    localStorage.setItem('token', token.token);
}