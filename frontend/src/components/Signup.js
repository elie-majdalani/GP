import axios from "axios";
export const register = async (displayName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    try {
        const body= {
            displayName,
            email,
            password,
        }
        const res = await axios.post("http://127.0.0.1:4001/register", body);
        if (res.status === 200) {
            window.location.href = '/login';
        }
    }
    catch (err) {
        console.log(err);
    }
}