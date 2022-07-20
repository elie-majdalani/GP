import { deposit } from "../components/deposit";
import { withdraw } from "../components/withdraw";
import { useAppContext } from '../components/userContext';
import { useState, useEffect } from "react";
export const Wallet = () => {
    const appdata = useAppContext()
    const [withdrawPage, setWithdrawPage] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAmount, setWalletAmount] = useState('');
    const [coin,setCoin] = useState('ETH');
    useEffect(() => {
        if(!appdata.user){
            window.location.href = '/login'
        }
    })
    return (
        withdrawPage ?
            <div>
                <span>Withdraw value in USD</span>
                <input type="number" />
                <span>Withdraw value in {coin}</span>
                <input type="number" onChange={(e)=>setWalletAmount(e)}/>
                <input type="text" placeholder="Wallet Address" onChange={(e)=>{setWalletAddress(e)}}/>
                <button onClick={withdraw(coin,walletAmount)}>Withdraw</button>
                <div>
                    <button onClick={setCoin("ETH")}>Etherium</button>
                    <button onClick={setCoin("TRX")}>TRX</button>
                    <button onClick={setCoin("USDT")}>USDT</button>
                </div>
            </div>
            :
            <div>
                <button onClick={setWalletAddress(deposite(coin))}>Generate Wallet</button>
                <input type="text" placeholder="Wallet Address" disabled value={walletAddress}/>
                <div>
                    <button onClick={setCoin("ETH")}>Etherium</button>
                    <button onClick={setCoin("TRX")}>TRX</button>
                    <button onClick={setCoin("USDT")}>USDT</button>
                </div>
            </div>
    )
}