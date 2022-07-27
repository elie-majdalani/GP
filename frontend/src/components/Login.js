import axios from "axios";
import configData from "../config.json";
export const login = async (email, password) => {
    try {
        const body = {
            email,
            password
        }
        const user = await axios.post(`${configData.SERVER_URL}/login`, body)
        if (user.data.token) {
            localStorage.setItem('token', user.data.token);
            return user.data
        }
    }
    catch (err) {
        console.log(err);
    }
}