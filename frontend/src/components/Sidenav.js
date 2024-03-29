import logo from '../assets/logo.png';
import support from '../assets/support.png';
export const SideNav = ({ setIsMessages, isMessages }) => {


    const handleClick = () => {
        if (isMessages)
            setIsMessages(false)
        else {
            setIsMessages(true)
        }
    }
    return (
        <div>
            <div id="sidenav">
                <div id="sidenav-header">
                    <div id="sidenav-header-logo">
                        <img id='logo' src={logo} alt='logo' />
                    </div>
                </div>

                <div className='sidenav-hr'>
                    <hr className="sidenav-divider"></hr>
                </div>

                <div id="sidenav-section-1">
                    <span id="sidenav-title-1" className="sidenav-title">Finances Dashboard</span>
                    <a href="/records">Expences & Revenue</a>
                    <a href="/records?type=chart">Charts</a>
                </div>

                <div id="sidenav-section-2">
                    <span id="sidenav-title-2" className="sidenav-title">Wallet Dashboard</span>
                    <a href="/wallet">Withdraw</a>
                    <a href="/wallet?type=deposit">Deposit</a>
                </div>

                <div className='sidenav-hr'>
                    <hr className="sidenav-divider"></hr>
                </div>

                <div id="sidenav-footer">
                    <img id='support' src={support} alt='support' />
                    <a onClick={() => { handleClick() }} href="#support">Support</a>
                </div>
            </div>
        </div>
    )
}