import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSignOutAlt, faDollarSign, faChartBar, faList, faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import api from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
import ExpenseLine from '../components/ExpenseLine';   // Line chart


export default function CreateExpense() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing the popup
  
    useEffect(() => {
      getCategories();
    }, []);
  
    const getCategories = () => {
      api
        .get("/api/categories/")
        .then((res) => res.data)
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => alert(err));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const expenseData = {
        category,
        amount,
        description,
      };
  
      api
        .post("/api/expenses/", expenseData)
        .then((res) => {
          if (res.status === 201) {
            // Show success popup on successful creation
            setShowSuccessPopup(true);
            // Clear form fields
            setAmount("");
            setDescription("");
            setCategory("");
          } else {
            alert("Failed to create expense.");
          }
        })
        .catch((err) => alert(err));
    };
  
    return (
      <div className="bg-gray-100 shadow-lg rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Create an Expense
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
            className="w-full bg-gray-100 px-4 py-3 border-2 border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
            Submit
          </button>
        </form>
  
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
                Expense Created Successfully!
              </h2>
              <p className="text-gray-700 text-center mb-6">The new expense has been added to your records.</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-teal-500 text-white py-3 px-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  