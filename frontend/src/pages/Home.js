import { useEffect } from 'react';
import { useAppContext } from '../components/userContext';
export const Home = () => {
    const appdata = useAppContext();
    console.log(appdata);
    useEffect(() => {
        if (appdata.user) {
            window.location.href = '/records';
        }
    }, [appdata.user]);
    return (
        <div>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
        </div>
    )
}
