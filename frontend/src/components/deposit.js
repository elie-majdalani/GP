import axios from 'axios';
export const Deposit = async (body) => {
    const res = await axios.post("http://127.0.0.1:4001/deposit",body)
    return res.data
}