import DoughnutChart from './DoughnutChart';
import BarChart from "./BarChart";
import { UserInfo } from "../components/userInfo";
export const Charts = ({ setYear, oldest, year, totalRevenue, totalExpense, chartYear, months, month, monthsExpense, monthsRevenue, setChartYear, setMonth }) => {
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
            <div className="charts-page-body-content">
                <div className="charts-section-1">
                    <div className="charts-selection">
                        <select className="selections" value={year} onChange={(e) => { setYear(e.target.value) }}>
                            {Array.from(Array(new Date().getFullYear() - oldest.getFullYear() + 1).keys()).map(item => {
                                return (
                                    <option key={item} value={item + oldest.getFullYear()}>{item + oldest.getFullYear()}</option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <div className="doughnutchart-wrapper">
                        <DoughnutChart totalRevenue={totalRevenue} totalExpense={totalExpense} />
                    </div>
                </div>
                <div className="charts-section-2">
                    <div className="charts-selection">
                        <select className="selections" value={chartYear} onChange={(e) => { setChartYear(e.target.value) }}>
                            {Array.from(Array(new Date().getFullYear() - oldest.getFullYear() + 1).keys()).map(item => {
                                return (
                                    <option key={item} value={item + oldest.getFullYear()}>{item + oldest.getFullYear()}</option>
                                )
                            }
                            )}
                        </select>

                        {/* <select className="selections" value={month} onChange={(e) => { setMonth(e.target.value) }}>
                            {Array.from(Array(12).keys()).map(item => {
                                return (
                                    <option key={item} value={item + 1}>{months[item]}</option>
                                )
                            }
                            )}
                        </select> */}
                    </div>
                    <div className="barchart-wrapper">
                        <BarChart months={months} monthsExpense={monthsExpense} monthsRevenue={monthsRevenue} />
                    </div>
                </div>
            </div>
        </div>
    )
}