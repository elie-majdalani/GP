import { useAppContext } from '../components/userContext';
export const withdraw = async (coin,amount) => {
    const appdata = useAppContext()
    const body= {
        coin,
        email: appdata.user.email,
        amount: amount,
        token: user.token
    }
    const res = await axios.post("http://127.0.0.1:4001/withdraw",body)
    return res.data
}