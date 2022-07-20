import { Withdraw } from "../components/withdraw";
import { Deposit } from "../components/deposit";
import { useAppContext } from '../components/userContext';
import { useState, useEffect } from "react";
export const Wallet = () => {
    const appdata = useAppContext()
    const [isDeposit, setIsDeposit] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAmount, setWalletAmount] = useState('');
    const [coin, setCoin] = useState('ETH');
    useEffect(() => {
        const type = window.location.href.split('type=')[1]
        if (type === 'deposit') {
            setIsDeposit(true)
        } else {
            setIsDeposit(false)
        }
    }, [appdata.user])
    return (
        <div>
            {!isDeposit ?
                (<div>
                    <span>Withdraw value in USD</span>
                    <input type="number" />
                    <span>Withdraw value in {coin}</span>
                    <input type="number" onChange={(e) => setWalletAmount(e)} />
                    <input type="text" placeholder="Wallet Address" onChange={(e) => { setWalletAddress(e) }} />
                    <button onClick={async () => await Withdraw(coin, walletAmount)}>Withdraw</button>
                    <div>
                        <button onClick={() => setCoin("ETH")}>Etherium</button>
                        <button onClick={() => setCoin("TRX")}>TRX</button>
                        <button onClick={() => setCoin("USDT")}>USDT</button>
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
                        debugger
                        setWalletAddress(wallet)
                    }}>Generate Wallet</button>
                    <input type="text" placeholder="Wallet Address" disabled value={walletAddress} />
                    <div>
                        <button onClick={() => setCoin("ETH")}>Etherium</button>
                        <button onClick={() => setCoin("TRX")}>TRX</button>
                        <button onClick={() => setCoin("USDT")}>USDT</button>
                    </div>
                </div>)}
        </div>

    )
}