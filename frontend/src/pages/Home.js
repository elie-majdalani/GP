import { userContext } from '../components/userContext';
import { useContext, useEffect } from 'react';
export const Home = () => {
    const {user} = useContext(userContext);
    useEffect(() => {
        if (user) {
            window.location.href = '/table';
        }
    }, [user]);
return (
    <div>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
    </div>
)
}
