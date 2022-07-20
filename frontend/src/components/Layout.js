import { useAppContext } from '../components/userContext';

export const Layout = ({ children }) => {
    const appdata = useAppContext();
    return (
        appdata.user &&
        <div className="layout">
            <div id="sidenav">
                <div id="sidenav-header">
                    <div id="sidenav-header-logo">
                        <img src="#" alt="Logo" />
                        <hr className="sidenav-divider"></hr>
                    </div>
                </div>

                <div id="sidenav-section-1">
                    <span id="sidenav-title-1" className="sidenav-title">Finances Dashboard</span>
                    <a href="/Expences-Revenue">Expences & Revenue</a>
                    <a href="/Charts">Charts</a>
                </div>

                <div id="sidenav-section-2">
                    <span id="sidenav-title-2" className="sidenav-title">Wallet Dashboard</span>
                    <a href="/Deposit">Deposit</a>
                    <a href="/Withdraw">Withdraw</a>
                </div>

                <div id="sidenav-footer">
                    <hr className="sidenav-divider"></hr>
                    <img src="#" alt="Support" />
                    <span>Support</span>
                </div>
            </div>
            {<main>{children}</main>}
            { appdata.user &&
            <div className="user-info">
                <span>{appdata.user.displayName}</span>
                <button onClick={() => {appdata.setUser();localStorage.clear()}}>Logout</button>
            </div>}
        </div>
    );
}