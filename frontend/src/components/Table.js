export const Table = ({totalRevenue,totalExpense,data}) => {
    return(
        <div>
            <h1>Total Revenue: {totalRevenue}</h1>
            <h1>Total Expense: {totalExpense}</h1>
            <h1>Total Profit: {totalRevenue-totalExpense}</h1>
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
    )
}