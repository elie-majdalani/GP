import DoughnutChart from './DoughnutChart';
import BarChart from "./BarChart";
import { UserInfo } from "../components/userInfo";
export const Charts = ({setYear,oldest,year,totalRevenue,totalExpense,chartYear,months,month,monthsExpense,monthsRevenue,setChartYear,setMonth}) => {
    return(
        <div>
            <UserInfo />
            <select value={year} onChange={(e) => { setYear(e.target.value) }}>
                {Array.from(Array(new Date().getFullYear() - oldest.getFullYear() + 1).keys()).map(item => {
                    return (
                        <option key={item} value={item + oldest.getFullYear()}>{item + oldest.getFullYear()}</option>
                    )
                }
                )}
            </select>
            <DoughnutChart totalRevenue={totalRevenue} totalExpense={totalExpense} />
            <select value={chartYear} onChange={(e) => { setChartYear(e.target.value) }}>
                {Array.from(Array(new Date().getFullYear() - oldest.getFullYear() + 1).keys()).map(item => {
                    return (
                        <option key={item} value={item + oldest.getFullYear()}>{item + oldest.getFullYear()}</option>
                    )
                }
                )}
            </select>
            <select value={month} onChange={(e) => { setMonth(e.target.value) }}>
                {Array.from(Array(12).keys()).map(item => {
                    return (
                        <option key={item} value={item+1}>{months[item]}</option>
                    )
                }
                )}
            </select>
            <BarChart months={months} monthsExpense={monthsExpense} monthsRevenue={monthsRevenue} />
        </div>
    )
}