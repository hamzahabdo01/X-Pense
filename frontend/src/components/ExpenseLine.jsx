import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import LoadingIndicator from './LoadingIndicator';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function ExpenseLine({ expenses, categories }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses.length > 0 && categories.length > 0) {
            setLoading(false);
        }
    }, [expenses, categories]);

    const data = {
        labels: expenses.map(expense => expense.date),
        datasets: [
            {
                label: 'Expenses over Time',
                data: expenses.map(expense => expense.amount),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Space Grotesk, sans-serif',
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Space Grotesk, sans-serif',
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        family: 'Space Grotesk, sans-serif',
                    },
                },
            },
        },
    };

    return (
        loading ? (
            <LoadingIndicator/>
        ) : (
            <div style={{ width: '550px', height: '250px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <Line data={data} options={options} />
            </div>
        )
    );
}

export default ExpenseLine;