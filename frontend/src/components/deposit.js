import { useAppContext } from '../components/userContext';
import axios from 'axios';

export const deposit = async (coin,user) => {
    const appdata = useAppContext()
    const body= {
        coin,
        token: user.token,
        email: appdata.user.email
    }
    const res = await axios.post("http://127.0.0.1:4001/deposit",body)
    return res.data
}