import { Withdraw } from "../components/withdraw";
import { Deposit } from "../components/deposit";
import { useAppContext } from '../components/userContext';
import { useState, useEffect } from "react";
import compare from '../assets/compare.png';
import { UserInfo } from "../components/userInfo";

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
    const handleWithdraw = async () => {
        await Withdraw(coin, walletAmount, appdata)
    }
    return (
        <div>
            {!isDeposit ?
                (<div className="wallet-body-wrapper">
                    <div className="wallet-body">
                        <div className="wallet-body-header">
                            <div className="wallet-body-header-title-wrapper">
                                <div className="wallet-body-header-title">
                                    <h1>Wallet</h1>
                                </div>
                                <div className="wallet-body-header-hr">
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="wallet-body-content">
                            <div className="wallet-body-content-warning">
                                <span id="withdraw-warning">Ensure the network you choose to deposit matches the withdrawal network, or assets may be lost</span>
                            </div>
                            <div className="wallet-body-content-calculation-div">
                                <div className="wallet-body-content-usd">
                                    <span>Withdraw value in USD</span>
                                    {coin === 'ETH' ?
                                    <input type="number" disabled={true} value={appdata.rate && coin === 'USDT' ? Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(1) : appdata.rate && Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(5)} />
                                    :<input type="number" value={walletAmount} onChange={(e) => {setWalletAmount(e.currentTarget.value)}} />}
                                </div>
                                <div className="wallet-body-content-compare">
                                    <img id="compare" src={compare} alt='compare' />
                                </div>
                                <div className="wallet-body-content-coin">
                                    <span>Withdraw value in {coin}</span>
                                    {coin === 'TRX' || coin === 'USDT' ?
                                    <input type="number" disabled={true} value={appdata.rate && coin === 'USDT' ? Number.parseFloat(walletAmount / appdata.rate[coin]).toFixed(1) : appdata.rate && Number.parseFloat(walletAmount / appdata.rate[coin]).toFixed(5)} />
                                    :<input type="number" value={walletAmount} onChange={(e) => {setWalletAmount(e.currentTarget.value)}} />
                                }
                                </div>
                            </div>
                            <div className="wallet-body-content-address">
                                <span>Reciving Address</span>
                                <input id="reciving-address" type="text" placeholder="Wallet Address" onChange={(e) => { setWalletAddress(e) }} />
                            </div>

                            <button className="main-btn" id="withdraw-btn" onClick={() => handleWithdraw()}>Withdraw</button>
                        </div>
                    </div>

                    <div className="wallet-sidenav">
                        <UserInfo />
                        <div className="wallet-sidenav-header">
                            <div className="wallet-sidenav-header-title">
                                <h1>Coins</h1>
                            </div>
                            <div className="wallet-sidenav-header-hr">
                                <hr />
                            </div>
                        </div>
                        <div className="wallet-sidenav-content">
                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("ETH")}>Etherium</button>
                                <span>{appdata.user && appdata.user.wallet.eth && Number.parseFloat(appdata.user.wallet.eth.balance).toFixed(5)}</span>
                            </div>

                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("TRX")}>TRX</button>
                                <span>{appdata.user && appdata.user.wallet.trx && Number.parseFloat(appdata.user.wallet.trx.balance).toFixed(5)}</span>
                            </div>

                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("USDT")}>USDT</button>
                                <span>{appdata.user && appdata.user.wallet.usdt && Number.parseFloat(appdata.user.wallet.usdt.balance).toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>)
                :
                (<div className="wallet-body-wrapper">
                    <div className="wallet-body">
                        <div className="wallet-body-header">
                            <div className="wallet-body-header-title-wrapper">
                                <div className="wallet-body-header-title">
                                    <h1>Wallet</h1>
                                </div>
                                <div className="wallet-body-header-hr">
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="wallet-body-content">
                            <div className="wallet-body-content-warning">
                                <span id="withdraw-warning">Ensure the network you choose to deposit matches the withdrawal network, or assets may be lost</span>
                            </div>
                            <div className="wallet-body-content-genrate">
                                <span>Deposit {coin} </span>
                                <button className="main-btn" onClick={async () => {
                                    const body = {
                                        coin,
                                        token: localStorage.getItem('token'),
                                        email: appdata.user.email
                                    }
                                    const wallet = await Deposit(body);
                                    setWalletAddress(wallet)
                                }}>Generate Wallet</button>
                                <input id="reciving-address" type="text" placeholder="Wallet Address" disabled value={walletAddress} />
                                <span>This is your permanent deposit address.</span>
                            </div>
                        </div>
                    </div>

                    <div className="wallet-sidenav">
                        <UserInfo />
                        <div className="wallet-sidenav-header">
                            <div className="wallet-sidenav-header-title">
                                <h1>Coins</h1>
                            </div>
                            <div className="wallet-sidenav-header-hr">
                                <hr />
                            </div>
                        </div>
                        <div className="wallet-sidenav-content">
                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("ETH")}>Etherium</button>
                                <span>{appdata.user && appdata.user.wallet.eth && Number.parseFloat(appdata.user.wallet.eth.balance).toFixed(5)}</span>
                            </div>

                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("TRX")}>TRX</button>
                                <span>{appdata.user && appdata.user.wallet.trx && Number.parseFloat(appdata.user.wallet.trx.balance).toFixed(5)}</span>
                            </div>

                            <div className="wallet-sidenav-coin">
                                <button onClick={() => setCoin("USDT")}>USDT</button>
                                <span>{appdata.user && appdata.user.wallet.usdt && Number.parseFloat(appdata.user.wallet.usdt.balance).toFixed(1)}</span>
                            </div>
                        </div>
                    </div>

                </div>)}
        </div>

    )
}