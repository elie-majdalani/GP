import axios from 'axios';
import configData from '../config.json';
export const Withdraw = async (coin,amount,appdata,recipient) => {
    const body= {
        coin,
        recipient,
        email: appdata.user.email,
        amount: amount,
        token: appdata.user.token
    }
    const res = await axios.post(`${configData.SERVER_URL}/withdraw`,body)
    return res.data
}