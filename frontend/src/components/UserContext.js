import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../components/fetchUser'
const AppContext = createContext()

export const AppWrapper = ({
    children,
}) => {
    const [user, setUser] = useState()
    useEffect(() => {
        if (user) return
        fetchData()
    }, [])
    const fetchData = async () => {
        const token = localStorage.getItem('token')
        console.log('herer')
        if (token) {
            const userData = await User()
            console.log(userData)
            setUser(userData)
        } else {
            setUser()
        }
    }
    return (
        <AppContext.Provider
            value={{
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