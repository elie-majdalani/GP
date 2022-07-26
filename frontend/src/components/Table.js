import { UserInfo } from "../components/userInfo";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
export const Table = ({ data, show, setShow, setAdd }) => {
    const [oldest, setOldest] = useState(new Date());
    const [tableData, setTableData] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [chartYear, setChartYear] = useState(new Date().getFullYear());
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        let revenue = 0
        let expense = 0
        if (tableData) {
            tableData.forEach((item) => {
                const date = item.createdAt
                const defaultDate = new Date(date.split('T'))

                if (defaultDate.getFullYear() < oldest.getFullYear()) {
                    setOldest(defaultDate)
                }

                if (defaultDate.getFullYear() === parseInt(chartYear) && defaultDate.getMonth() + 1 === parseInt(month)) {
                    if (item.type) {
                        revenue = revenue + item.amount
                    } else {
                        expense = expense + item.amount
                    }
                }
            })
        }
        setTotalExpense(expense)
        setTotalRevenue(revenue)
    }, [tableData, chartYear, month])
    useEffect(() => { setTableData(data) }, [data])
    return (
        <div>
            <div className="expences-body-header">
                <div className="wallet-body-header-title-wrapper">
                    <div className="wallet-body-header-title">
                        <h1>Expences & Revenue</h1>
                    </div>
                    <div className="wallet-body-header-hr">
                        <hr />
                    </div>
                </div>
                <UserInfo />
            </div>
            <div className="expences-body-content">
                <div className="expences-body-content-section-1">
                    <div className="inputs-modal-btn-div">
                        <button className="selections" id="input-btn" onClick={() => setShow(true)}>Input</button>
                        <Modal onClose={() => setShow(false)} show={show} setAdd={setAdd} />
                    </div>
                    <div className="date-selection-div">
                        <div className="date-selection-div-year">
                            <select className="selections" value={chartYear} onChange={(e) => { setChartYear(e.target.value) }}>
                                {Array.from(Array(new Date().getFullYear() - oldest.getFullYear() + 1).keys()).map(item => {
                                    return (
                                        <option key={item} value={item + oldest.getFullYear()}>{item + oldest.getFullYear()}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div className="date-selection-div-month">
                            <select className="selections" value={month} onChange={(e) => { setMonth(e.target.value) }}>
                                {Array.from(Array(12).keys()).map(item => {
                                    return (
                                        <option key={item} value={item + 1}>{months[item]}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="expences-body-content-section-2">
                    <div className="total-revenue-div">
                        <div className="total-div-title">
                            <button className="total-btn" id="total-btn-blue"></button>
                            <span>Total Revenue: </span>
                        </div>
                        <span className="total-div-number">{totalRevenue} $</span>
                    </div>
                    <div className="total-expences-div">
                        <div className="total-div-title">
                            <button className="total-btn" id="total-btn-red"></button>
                            <span>Total Expense: </span>
                        </div>
                        <span className="total-div-number">{totalExpense} $</span>
                    </div>
                    <div className="total-profit-div">
                        <div className="total-div-title">
                            <button className="total-btn" id="total-btn-green"></button>
                            <span>Total Profit: </span>
                        </div>
                        <span className="total-div-number">{totalRevenue - totalExpense} $</span>
                    </div>
                </div>
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Discription</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(item => {
                                const date = item.createdAt
                                const defaultDate = new Date(date.split('T'))
                                if (defaultDate.getFullYear() < oldest.getFullYear()) {
                                    setOldest(defaultDate)
                                }

                                if (defaultDate.getFullYear() === parseInt(chartYear) && defaultDate.getMonth() + 1 === parseInt(month)) {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.discription}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.type ? 'Revenue' : 'Expense'}</td>
                                            <td>{defaultDate.getDate() + "-" + parseInt(defaultDate.getMonth() + 1) + "-" + defaultDate.getFullYear()}</td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}