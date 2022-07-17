export const sidenav = () => {
    return (
        <div id="sidenav">
            <div id="sidenav-header">
                <div id="sidenav-header-logo">
                    <img src="#" alt="Logo" />
                    <hr class="sidenav-divider"></hr>
                </div>
            </div>
            
            <div id="sidenav-section-1">
                <span id="sidenav-title-1" class="sidenav-title">Finances Dashboard</span>
                <a href="/Expences-Revenue">Expences & Revenue</a>
                <a href="/Charts">Charts</a>
            </div>

            <div id="sidenav-section-2">
                <span id="sidenav-title-2" class="sidenav-title">Wallet Dashboard</span>
                <a href="/Deposit">Deposit</a>
                <a href="/Withdraw">Withdraw</a>
            </div>

            <div id="sidenav-footer">
                <hr class="sidenav-divider"></hr>
                <img src="#" alt="Support" />
                <span>Support</span>
            </div>
        </div>
    )
}