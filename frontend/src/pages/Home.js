import { useEffect } from 'react';
import { useAppContext } from '../components/userContext';
import GP from '../assets/GP.png';
import laptop from '../assets/laptop-v2.jpg';
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
                <img id="home-gp" src={GP} alt='GP' />
                <img id="home-laptop" src={laptop} alt='laptop' />
            </div>
            <div className="right-home-main-div">
                <a href="/signup">Signup</a>
                <a href="/login">Login</a>
            </div>
        </div>
    )
}
