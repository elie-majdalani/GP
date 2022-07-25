import { Withdraw } from "../components/withdraw";
import { Deposit } from "../components/deposit";
import { useAppContext } from '../components/userContext';
import { useState, useEffect } from "react";
import compare from '../assets/compare.png';

export const Wallet = ({ db }) => {
    const appdata = useAppContext();
    const [isDeposit, setIsDeposit] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAmount, setWalletAmount] = useState(0);
    const [coin, setCoin] = useState('ETH');
    useEffect(() => {
        const type = window.location.href.split('type=')[1]
        if (appdata) {
            if (type === 'deposit') {
                setIsDeposit(true)
            } else {
                setIsDeposit(false)
            }
        }
    }, [appdata.user, appdata])
    return (
        <div>
            {!isDeposit ?
                (<div>
                    <div className="wallet-body">
                        <div className="wallet-body-header">
                            <div className="wallet-body-header-title">
                                <h1>Wallet</h1>
                            </div>
                            <div className="wallet-body-header-hr">
                                <hr />
                            </div>
                        </div>
                        <div className="wallet-body-content">
                            <div className="wallet-body-content-warning">
                                <span id="withdraw-warning">Ensure the network you choose to deposit matches the withdrawal network, or assets may be lost</span>
                            </div>
                            <div className="wallet-body-content-calculation-div">
                                <div className="wallet-body-content-usd">
                                    <span>Withdraw value in USD</span>
                                    <input type="number" disabled={true} value={appdata.rate && coin === 'USDT' ? Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(1) : appdata.rate && Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(5)} />
                                </div>
                                <div className="wallet-body-content-compare">
                                    <img id="compare" src={compare} alt='compare' />
                                </div>
                                <div className="wallet-body-content-coin">
                                    <span>Withdraw value in {coin}</span>
                                    <input type="number" value={walletAmount} onChange={(e) => {
                                        setWalletAmount(e.currentTarget.value)
                                    }} />
                                </div>
                            </div>
                            <div className="wallet-body-content-address">
                                <span>Reciving Address</span>
                                <input id="reciving-address" type="text" placeholder="Wallet Address" onChange={(e) => { setWalletAddress(e) }} />
                            </div>

                            <button className="main-btn" id="withdraw-btn" onClick={async () => await Withdraw(coin, walletAmount)}>Withdraw</button>
                        </div>
                    </div>

                    <div className="wallet-sidenav">
                        <div className="wallet-sidenav-coin">
                            <button onClick={() => setCoin("ETH")}>Etherium</button>
                            <span>{appdata.user && appdata.user.wallet.eth && appdata.user.wallet.eth.balance}</span>
                        </div>

                        <div className="wallet-sidenav-coin">
                            <button onClick={() => setCoin("TRX")}>TRX</button>
                            <span>{appdata.user && appdata.user.wallet.trx && appdata.user.wallet.trx.balance}</span>
                        </div>

                        <div className="wallet-sidenav-coin">
                            <button onClick={() => setCoin("USDT")}>USDT</button>
                            <span>{appdata.user && appdata.user.wallet.usdt && appdata.user.wallet.usdt.balance}</span>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                    <button onClick={async () => {
                        const body = {
                            coin,
                            token: localStorage.getItem('token'),
                            email: appdata.user.email
                        }
                        const wallet = await Deposit(body);
                        setWalletAddress(wallet)
                    }}>Generate Wallet</button>
                    <input type="text" placeholder="Wallet Address" disabled value={walletAddress} />
                    <div>
                        <button onClick={() => setCoin("ETH")}>Etherium</button><span>{appdata.user && appdata.user.wallet.eth && appdata.user.wallet.eth.balance}</span>
                        <button onClick={() => setCoin("TRX")}>TRX</button><span>{appdata.user && appdata.user.wallet.trx && appdata.user.wallet.trx.balance}</span>
                        <button onClick={() => setCoin("USDT")}>USDT</button><span>{appdata.user && appdata.user.wallet.usdt && appdata.user.wallet.usdt.balance}</span>
                    </div>
                </div>)}
        </div>

    )
}