import { useAppContext } from '../components/userContext';
export const withdraw = async (coin,amount) => {
    const appdata = useAppContext()
    const res = await axios.post("http://127.0.0.1:4001/withdraw",{
        body: {
            coin,
            email: appdata.user.email,
            amount: amount,
            token: user.token
        }
    })
    return res.data
}