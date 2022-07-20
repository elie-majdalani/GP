import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../components/fetchUser'
import axios from 'axios'
const AppContext = createContext()

export const AppWrapper = ({
    children,
}) => {
    const [user, setUser] = useState()
    const [rate, setRate] = useState()
    useEffect(() => {
        fetchRate()
        if (user) return
        fetchData()
        
    }, [user])
    const fetchData = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const userData = await User()
            setUser(userData)
        } else {
            setUser()
        }
    }
    const fetchRate = async () => {
        const pricesEth = await axios.get(`https://api.cryptapi.io/eth/info/`);
        const pricesTrx = await axios.get(`https://api.cryptapi.io/trx/info/`);
        const pricesUsdt = await axios.get(`https://api.cryptapi.io/trc20/usdt/info/`);
        const prices = {
            ETH: pricesEth.data.prices.USD,
            TRX: pricesTrx.data.prices.USD,
            USDT: pricesUsdt.data.prices.USD
        }
        if (prices) {
            setRate(prices)
        } else {
            setUser()
        }
    }
    return (
        <AppContext.Provider
            value={{
                rate,
                user,
                setUser,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}