export const sidenav = () => {
    return (
        <div id="sideboard">
            <div id="sideboard-header">
                <div id="sideboard-header-logo">
                    <img src="#" alt="Logout" />
                    <hr class="sideboard-divider"></hr>
                </div>
            </div>
            
            <div id="sideboard-title-section">
                <span id="sideboard-title">History</span>
                <hr class="sideboard-divider"></hr>
            </div>

            <div id="sideboard-section-2">
                <span id="sideboard-title-2" class="sideboard-title">Wallet Dashboard</span>
                <a href="/Deposit">Deposit</a>
                <a href="/Withdraw">Withdraw</a>
            </div>
        </div>
    )
}