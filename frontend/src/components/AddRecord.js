import { useState } from "react";
import { useAppContext } from './userContext';
import axios from "axios";

export const AddRecord = ({ onClose, setAdd }) => {
    const appdata = useAppContext();
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [discription, setDiscription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState(true)


    const handleSubmit = async () => {
        const body = {
            token: localStorage.getItem('token'),
            email: appdata.user.email,
            name,
            category,
            discription,
            amount: parseInt(amount),
            type
        }
        await axios.post("http://127.0.0.1:4001/addRecord", body)
        setAdd(true)
    }

    return (
        <div className="add-record-modal-contents-div">
            <div className="add-record-modal-header-div">
                <h1>Add Record</h1>
            </div>
            <input type="text" placeholder="name" onChange={(e) => { setName(e.target.value) }} />
            <input type="text" placeholder="category" onChange={(e) => { setCategory(e.target.value) }} />
            <input type="text" placeholder="discription" onChange={(e) => { setDiscription(e.target.value) }} />
            <input type="text" placeholder="amount" onChange={(e) => { setAmount(e.target.value) }} />
            <select value={type} onChange={(e) => { setType(e.target.value) }}>
                <option value="true">Revenue</option>
                <option value="false">Expense</option>
            </select>
            <button id="main-btn" onClick={() => { handleSubmit(); onClose() }}>Add</button>

        </div>
    )
}
