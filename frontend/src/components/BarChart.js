import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({months,monthsExpense,monthsRevenue}) => {
    const options = {
        plugins: {
            title: {
                display: true,          
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = months;

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: monthsExpense,
                backgroundColor: 'rgb(255, 0, 0)',
            },
            {
                label: 'Revenue',
                data: monthsRevenue,
                backgroundColor: 'rgb(0, 56, 255)',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
    );
}
export default BarChart;
