import { useEffect } from 'react';
import { useAppContext } from '../components/userContext';
import GP from '../assets/GP.png';
import laptop from '../assets/laptop-v2.png';
import notes from '../assets/Banknotes.png';
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
                <img id="notes" src={notes} alt='notes' />
                <span id="home-left-title">Finance Monitoring</span>
                <span id="home-left-subtitle">Keep an eye on you income and expenditure using graphs and tables</span>
            </div>
            <div className="right-home-main-div">
                <a href="/signup">Signup</a>
                <a href="/login">Login</a>
            </div>
        </div>
    )
}
