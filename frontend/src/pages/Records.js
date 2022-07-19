import { useContext, useState, useEffect } from "react";
import { userContext } from '../components/userContext';
import {Sidenav} from "../components/Sidenav";

export const Records = () => {
    const { user } = useContext(userContext);
    const [charts, setCharts] = useState(false);
    const [data, setData] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartYear, setChartYear] = useState(new Date().getFullYear());
    const [oldest, setOldest] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [monthsRevenue,setMonthsRevenue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [monthsExpense,setMonthsExpense] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    return (
        <>
        <Sidenav /> 
        {charts} ?

         : 
         
        </>
    )
}