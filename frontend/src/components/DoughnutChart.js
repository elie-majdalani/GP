import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'

const DoughnutChart = ({ totalExpense, totalRevenue }) => {
    const chartData = {
        labels: [
            'Expenses',
            'Income',
            'Profit'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [totalExpense, totalRevenue, totalRevenue-totalExpense],
            backgroundColor: [
              'rgb(255, 0, 0)',
              'rgb(0, 56, 255)',
              'rgb(36, 255, 0)'
            ],
            hoverOffset: 4  
          }]
    };
    return (
        <Doughnut data={chartData} />
    );
}

export default DoughnutChart;