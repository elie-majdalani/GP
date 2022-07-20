import axios from "axios";
export const User = async () => {
    try {
        const body={
            token: localStorage.getItem('token'),
        }
        const res = await axios.post("http://127.0.0.1:4001/", body)
        if (res.data) {
            return res.data
        }
    }
    catch (err) {
        console.log(err);
    }
}