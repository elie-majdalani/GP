import { useEffect } from 'react';
import { useAppContext } from '../components/userContext';
import GP from '../assets/GP.png';
import laptop from '../assets/laptop-v2.png';
import notes from '../assets/Banknotes.png';
import wallet from '../assets/Wallet.png';
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
                <div className="home-buttons-div">
                    <a id ="signup-btn" href="/signup">Signup</a>
                    <a id="login-btn" href="/login">Login</a>
                </div>
                <div className="home-right-main-titles">
                    <span id="home-right-main-title">Finance management and crypto wallets are two sides of the same</span>
                    <span id="home-right-main-title-coin"> coin </span>
                </div>
                <img id="wallet" src={wallet} alt='wallet' />
                <span id="home-right-tile">Crypto Wallet</span>
                <div className='home-right-subtitle'>
                    <span id="home-right-subtitle">Crypto wallet access for your <span id="home-right-subtitle-coin"> coins </span> and financial databade in one place</span>
                </div>
            </div>
        </div>
    )
}
