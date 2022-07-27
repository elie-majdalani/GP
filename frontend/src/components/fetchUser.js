import axios from "axios";
import configData from "../config.json";
export const User = async () => {
    try {
        const body={
            token: localStorage.getItem('token'),
        }
        const res = await axios.post(`${configData.SERVER_URL}/`, body)
        if (res.data) {
            return res.data
        }
    }
    catch (err) {
        console.log(err);
    }
}