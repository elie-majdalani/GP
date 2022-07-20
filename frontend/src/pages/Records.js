import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from '../components/userContext';
import { Table } from "../components/Table";
import { Charts } from "../components/Charts";

export const Records = () => {
    const appdata = useAppContext()
    const [isCharts, setIsCharts] = useState(false);
    const [data, setData] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartYear, setChartYear] = useState(new Date().getFullYear());
    const [oldest, setOldest] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [monthsRevenue, setMonthsRevenue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthsExpense, setMonthsExpense] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    useEffect(() => {
        const type = window.location.href.split('type=')[1]
        if(type==='chart'){
            setIsCharts(true)
        }else{
            setIsCharts(false)
        }
        
        async function getData() {
            const result = await axios.post("http://127.0.0.1:4001/getRecords", {
                body: {
                    token: localStorage.getItem('token'),
                    email: appdata.user.email,
                }
            })
            const records = await result.json();
            setData(records);
            setTotalExpense(0)
            setTotalRevenue(0)
            setMonthsRevenue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setMonthsExpense([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            records.forEach(item => {
                const date = item.createdAt
                const defaultDate = new Date(date.split('T'))
                if (defaultDate.getFullYear() < oldest.getFullYear()) {
                    setOldest(defaultDate)
                }
                if (item.type && defaultDate.getFullYear() === parseInt(year)) {
                    setTotalRevenue(prev => prev + item.amount);
                }
                else if (item.type === false && defaultDate.getFullYear() === parseInt(year)) {
                    setTotalExpense(prev => prev + item.amount);
                }
                // check month of record
                if (item.type && defaultDate.getFullYear() === parseInt(chartYear) && defaultDate.getMonth() + 1 <= parseInt(month)) {
                    setMonthsRevenue(monthsRevenue => {
                        // add data to monthsRevenue array
                        monthsRevenue[defaultDate.getMonth()] += item.amount;
                        return monthsRevenue;
                    })
                }
                else if (item.type === false && defaultDate.getFullYear() === parseInt(chartYear) && defaultDate.getMonth() + 1 <= parseInt(month)) {
                    setMonthsExpense(monthsExpense => {
                        monthsExpense[defaultDate.getMonth()] += item.amount;
                        return monthsExpense;
                    })
                }
            })
        }
        if (appdata.user) {
            getData();
        }
    }, [year, month, appdata]);
    return (
        <div>
            {isCharts ?
                <Charts setYear={setYear} oldest={oldest} year={year} totalRevenue={totalRevenue} totalExpense={totalExpense} chartYear={chartYear} months={months} month={month} monthsExpense={monthsExpense} monthsRevenue={monthsRevenue} setChartYear={setChartYear} setMonth={setMonth} />
                :
                <Table data={data} totalExpense={totalExpense} totalRevenue={totalRevenue} />}
        </div>
    )
}