import { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

function CreateExpense() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const { expenseId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getCategories();
        if (expenseId) {
            fetchExpenseData(expenseId);
            setIsEditMode(true);
        }
    }, [expenseId]);

    const getCategories = () => {
        api
            .get("/api/categories/")
            .then((res) => res.data)
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => alert(err));
    };

    const fetchExpenseData = (id) => {
        api
            .get(`/api/expenses/${id}/`)
            .then((res) => {
                const { category, amount, description } = res.data;
                setCategory(category);
                setAmount(amount);
                setDescription(description);
            })
            .catch((err) => alert("Failed to fetch expense data."));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseData = {
            category,
            amount,
            description,
        };

        if (isEditMode) {
            api
                .put(`/api/expenses/edit/${expenseId}/`, expenseData)
                .then((res) => {
                    if (res.status === 200) alert("Expense updated!");
                    else alert("Failed to update expense.");
                })
                .catch((err) => alert(err));
        } else {
            api
                .post("/api/expenses/", expenseData)
                .then((res) => {
                    if (res.status === 201) alert("Expense created!");
                    else alert("Failed to create expense.");
                })
                .catch((err) => alert(err));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-100">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-xl p-12 max-w-lg mx-auto space-y-6 border-2 border-teal-500 relative bottom-12"
            >
                <h2 className="text-4xl font-bold text-center text-gray-800">
                    {isEditMode ? "Edit Expense" : "Create an Expense"}
                </h2>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Enter amount"
                    className="w-full px-6 py-4 border border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter description"
                    className="w-full px-6 py-4 border border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <select
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white px-6 py-4 border border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-colors duration-300"
                >
                    {isEditMode ? "Update Expense" : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default CreateExpense;
