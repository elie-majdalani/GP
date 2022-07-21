import { useEffect } from 'react';
import { useAppContext } from '../components/userContext';
import GP from '../assets/GP.png';
// import stylesheet
import '../styles/styles.css';
export const Home = () => {
    const appdata = useAppContext();
    console.log(appdata);
    useEffect(() => {
        if (appdata.user) {
            window.location.href = '/records';
        }
    }, [appdata.user]);
    return (
        <div className='hero-home-div'>
            <div className="left-home-main-div">
                <div className="left-home-main-div-top">
                    <img id="home-gp" src={GP} alt='GP' />
                    
                </div>
            </div>
            <div className="right-home-main-div">
                <a href="/signup">Signup</a>
                <a href="/login">Login</a>
            </div>
        </div>
    )
}
