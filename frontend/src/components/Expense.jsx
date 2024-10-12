import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import api from '../api'; // Make sure to import your API service
import LoadingIndicator from './LoadingIndicator';

function Expense({ expense, onDelete }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use navigate to go to the edit page

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        api
            .get("/api/categories/")
            .then((res) => res.data)
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err);
                setLoading(false);
            });
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : "Loading...";
    };

    const handleEdit = () => {
        navigate(`/edit-expense/${expense.id}`); // Navigate to the edit page with expenseId
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center space-x-4">
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div>
                    <p className="text-lg font-semibold text-gray-800">{getCategoryName(expense.category)}</p>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.date}</p>
                </div>
            )}
            <div className="flex items-center space-x-4">
                <p className="text-xl font-bold text-teal-600">${expense.amount}</p>
                <button 
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300" 
                    onClick={handleEdit}  // Handle edit button click
                >
                    Edit
                </button>
                <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300" 
                    onClick={() => onDelete(expense.id)} // Handle delete button click
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Expense;
