import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LoadingIndicator from './LoadingIndicator';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses, categories }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses.length > 0 && categories.length > 0) {
            setLoading(false);
        }
    }, [expenses, categories]);

    const data = {
        datasets: [
            {
                data: categories.map(category => {
                    return expenses
                        .filter(expense => String(expense.category) === String(category.id))
                        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
                }),
                backgroundColor: [
                    'white',  // Light green
                    '#14b8a6',  // Dark teal
                    '#99f6e4',  // Black
                ],
                borderWidth: 0.4,  // Set border width to 0
                borderColor: 'black',
                hoverOffset: 10
            }
        ]
    };

    return (
        loading ? (
            <LoadingIndicator/>
        ) : (
            <div className="relative flex flex-col items-center bg-transparent rounded-lg p-4">
                <Doughnut data={data} className="w-80 h-80" />
                <div className="flex justify-center mt-4">
                    <div className="flex items-center mr-6">
                        <span className="bg-[#14b8a6] rounded-full w-3 h-3 inline-block"></span>
                        <span className="ml-2">Home</span>
                    </div>
                    <div className="flex items-center mr-6">
                        <span className="bg-[#99f6e4] rounded-full border border-black w-3 h-3 inline-block"></span>
                        <span className="ml-2">Shopping</span>
                    </div>
                    <div className="flex items-center">
                        <span className="bg-white rounded-full border border-black w-3 h-3 inline-block"></span>
                        <span className="ml-2">Health</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default ExpenseChart;