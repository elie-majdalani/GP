import axios from "axios";
export const login = async (email, password) => {
    try {
        const body = {
            email,
            password
        }
        const user = await axios.post("http://127.0.0.1:4001/login", body)
        if (user.data.token) {
            localStorage.setItem('token', user.data.token);
            return user.data
        }
    }
    catch (err) {
        console.log(err);
    }
}