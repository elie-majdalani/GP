import axios from "axios";
import configData from "../config.json";
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
        const res = await axios.post(`${configData.SERVER_URL}/register`, body);
        if (res.status === 200) {
            window.location.href = '/login';
        }
    }
    catch (err) {
        console.log(err);
    }
}