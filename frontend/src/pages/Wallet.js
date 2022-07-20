import { deposit } from "../components/deposit";
import { withdraw } from "../components/withdraw";

export const Wallet = () => {
    const [withdrawPage, setWithdrawPage] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAmount, setWalletAmount] = useState('');
    const [coin,setCoin] = useState('ETH');
    return (
        withdrawPage ?
            <div>
                <span>Withdraw value in USD</span>
                <input type="number" />
                <span>Withdraw value in {coin}</span>
                <input type="number" onChange={(e)=>setWalletAmount(e)}/>
                <input type="text" placeholder="Wallet Address" onChange={(e)=>{setWalletAddress(e)}}/>
                <button onClick={withdraw(coin,user,walletAmount)}>Withdraw</button>
                <div>
                    <button onClick={setCoin("ETH")}>Etherium</button>
                    <button onClick={setCoin("TRX")}>TRX</button>
                    <button onClick={setCoin("USDT")}>USDT</button>
                </div>
            </div>
            :
            <div>
                <button onClick={setWalletAddress(deposite(coin,user))}>Generate Wallet</button>
                <input type="text" placeholder="Wallet Address" disabled value={walletAddress}/>
                <div>
                    <button onClick={setCoin("ETH")}>Etherium</button>
                    <button onClick={setCoin("TRX")}>TRX</button>
                    <button onClick={setCoin("USDT")}>USDT</button>
                </div>
            </div>
    )
}