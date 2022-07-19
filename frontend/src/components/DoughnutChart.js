import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

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
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4  
          }]
    };
    return (
        <Doughnut data={chartData} />
    );
}

export default DoughnutChart;