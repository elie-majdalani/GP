import axios from 'axios';
import configData from '../config.json';
export const Deposit = async (body) => {
    const res = await axios.post(`${configData.SERVER_URL}/deposit`,body)
    return res.data
}