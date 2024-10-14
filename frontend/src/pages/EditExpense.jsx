import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditExpense() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { expenseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    fetchExpenseData(expenseId);
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

    api
      .put(`/api/expenses/edit/${expenseId}/`, expenseData)
      .then((res) => {
        if (res.status === 200) {
          setShowPopup(true);
        } else {
          alert("Failed to update expense.");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="bg-teal-300 min-h-screen flex items-center justify-center relative">
      <div className="bg-teal-100 shadow-lg rounded-xl p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Edit Expense
          </h2>
          <input
            type="text"
            id="amount"
            name="amount"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border-2 border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <input
            type="text"
            id="description"
            name="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter description"
            className="w-full px-4 py-3 border-2 border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white px-4 py-3 border-2 border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 px-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
          >
            Update Expense
          </button>
          <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-500 text-white py-3 px-5 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
            >
              Back to Dashboard
            </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
              Expense Updated Successfully!
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Your changes have been saved.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-teal-500 text-white py-3 px-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditExpense;
