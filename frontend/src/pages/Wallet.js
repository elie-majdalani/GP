import { Withdraw } from "../components/withdraw";
import { Deposit } from "../components/deposit";
import { useAppContext } from '../components/userContext';
import { useState, useEffect } from "react";

export const Wallet = ({ db }) => {
    const appdata = useAppContext();
    const [isDeposit, setIsDeposit] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAmount, setWalletAmount] = useState(0);
    const [coin, setCoin] = useState('ETH');
    useEffect(() => {
        const type = window.location.href.split('type=')[1]
        if (type === 'deposit') {
            setIsDeposit(true)
        } else {
            setIsDeposit(false)
        }
    }, [appdata.user])
    console.log(appdata.rate)
    return (
        <div>
            {!isDeposit ?
                (<div>
                    <span>Withdraw value in USD</span>
                    {/* <input type="number" disabled={true} value={appdata.rate && coin === 'USDT' ? Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(1) : Number.parseFloat(walletAmount * appdata.rate[coin]).toFixed(5)} /> */}
                    <span>Withdraw value in {coin}</span>
                    <input type="number" value={walletAmount} onChange={(e) => {
                        setWalletAmount(e.currentTarget.value)
                    }} />
                    <input type="text" placeholder="Wallet Address" onChange={(e) => { setWalletAddress(e) }} />
                    <button onClick={async () => await Withdraw(coin, walletAmount)}>Withdraw</button>
                    <div>
                        <button onClick={() => setCoin("ETH")}>Etherium</button><span>{appdata.user && appdata.user.wallet.eth && appdata.user.wallet.eth.balance}</span>
                        <button onClick={() => setCoin("TRX")}>TRX</button><span>{appdata.user && appdata.user.wallet.trx && appdata.user.wallet.trx.balance}</span>
                        <button onClick={() => setCoin("USDT")}>USDT</button><span>{appdata.user && appdata.user.wallet.usdt && appdata.user.wallet.usdt.balance}</span>
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