import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({months,monthsExpense,monthsRevenue}) => {
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
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
                label: 'Dataset 1',
                data: monthsExpense,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: monthsRevenue ,
                backgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
    );
}
export default BarChart;
