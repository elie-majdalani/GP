import { useAppContext } from '../components/userContext';
import axios from 'axios';
export const Withdraw = async (coin,amount) => {
    const appdata = useAppContext()
    const body= {
        coin,
        email: appdata.user.email,
        amount: amount,
        token: appdata.user.token
    }
    const res = await axios.post("http://127.0.0.1:4001/withdraw",body)
    return res.data
}