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
                        <img src="#" alt="Logo" />
                        <hr className="sidenav-divider"></hr>
                    </div>
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

                <div id="sidenav-footer">
                    <hr className="sidenav-divider"></hr>
                    <img src="#" alt="Support" />
                    <a onClick={()=>{handleClick()}} href="#support">Support</a>
                </div>
            </div>
        </div>
    )
}