import { UserInfo } from "../components/userInfo";
import { Modal } from "../components/Modal";
export const Table = ({ totalRevenue, totalExpense, data, show, setShow, setAdd }) => {
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
                <div className="Inputs-modal-btn-div">
                    <button onClick={() => setShow(true)}>Show Modal</button>
                    <Modal onClose={() => setShow(false)} show={show} setAdd={setAdd} />
                </div>
                <div className="total-revenue-div">
                    <h1>Total Revenue: {totalRevenue}</h1>
                </div>
                <div className="total-expense-div">
                    <h1>Total Expense: {totalExpense}</h1>
                </div>
                <div className="total-profit-div">
                    <h1>Total Profit: {totalRevenue - totalExpense}</h1>
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
                            {data.map(item => {
                                const date = item.createdAt
                                const defaultDate = new Date(date.split('T'))
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
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}