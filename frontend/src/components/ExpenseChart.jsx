import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import LoadingIndicator from './LoadingIndicator';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses, categories }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses.length > 0 && categories.length > 0) {
            setLoading(false);
        }
    }, [expenses, categories]);

    // Calculate the total amount of expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    // Map categories to Font Awesome icons
    const categoryIcons = {
        'Home': faHome,
        'Shopping': faShoppingCart,
        'Health': faHeartbeat,
        // Add more categories and icons as needed
    };

    const data = {
        datasets: [
            {
                data: categories.map(category => {
                    return expenses
                        .filter(expense => String(expense.category) === String(category.id)) // Match category by ID
                        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0); // Sum amounts for each category
                }),
                backgroundColor: [
                    '#ccfbf1',  // Light green
                    '#14b8a6',  // Dark teal
                    '#000000',  // Black
                    // Add more colors if needed
                ],
                borderWidth: 5,
                cutout: '75%',  // Makes the doughnut thicker
                hoverOffset: 10
            }
        ]
    };

    // Custom plugin to draw the total in the center of the doughnut chart
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
            const { width, height, ctx } = chart;
            ctx.restore();
            const fontSize = (height / 150).toFixed(2); // Adjusted for large center text
            ctx.font = `${fontSize}em "Space Grotesk", sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';  // Black color for text

            const text = `$${totalExpenses}`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    };

    return (
        loading ? (
            <LoadingIndicator/>
        ) : (
            <div className="relative flex flex-col items-center bg-white rounded-lg p-4">
                {/* Render Doughnut Chart */}
                <Doughnut data={data} plugins={[centerTextPlugin]} className="w-80 h-80" />

                {/* Custom Legend below chart */}
                <div className="flex justify-center mt-4">
                    <div className="flex items-center mr-6">
                        <span className="bg-[#14b8a6] rounded-full w-3 h-3 inline-block"></span>
                        <span className="ml-2">Home</span>
                    </div>
                    <div className="flex items-center mr-6">
                        <span className="bg-black rounded-full w-3 h-3 inline-block"></span>
                        <span className="ml-2">Shopping</span>
                    </div>
                    <div className="flex items-center">
                        <span className="bg-[#ccfbf1] rounded-full w-3 h-3 inline-block"></span>
                        <span className="ml-2">Health</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default ExpenseChart;
