// import { useContext } from "react";
// import { useAppContext } from '../components/userContext';
    
export const saveGmail = async () => {
    body= {
        displayName: user.user.displayName,
        email: user.user.email,
        photoUrl: user.user.photoURL
    }
    const res = await await axios.post("http://127.0.0.1:4001/gmailRegister", body)
    const token = await res.json();
    localStorage.setItem('token', token.token);
}

export const checkGmail = async () => {
    body= {
        email: user.email
    }
    const res = await await axios.post("http://127.0.0.1:4001/gmail", body)
    if (res.status === 201) {
        return true;
    }
    const token = await res.json();
    localStorage.setItem('token', token.token);
}