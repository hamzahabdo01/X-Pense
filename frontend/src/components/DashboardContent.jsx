import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSignOutAlt, faDollarSign, faChartBar, faList, faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import api from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
import ExpenseLine from '../components/ExpenseLine';   // Line chart

// export default function DashboardContent({ setShowDeletePopup }) {
export default function DashboardContent() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search
  
    useEffect(() => {
      getExpenses();
      getCategories();
    }, []);
  
    const getExpenses = () => {
      api
        .get("/api/expenses/")
        .then((res) => res.data)
        .then((data) => {
          // Sort expenses by created date (assuming 'created_at' field exists)
          const sortedExpenses = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setExpenses(sortedExpenses);
        })
        .catch((err) => alert(err));
    };
  
    const getCategories = () => {
      api
        .get("/api/categories/")
        .then((res) => res.data)
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => alert(err));
    };
  
    const getCategoryName = (categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Loading...";
    };
  
    const deleteExpense = (id) => {
      api
        .delete(`/api/expenses/delete/${id}/`)
        .then((res) => {
          if (res.status === 204) {
            // setShowDeletePopup(true);
            getExpenses();
          } else {
            alert("Failed to delete expense.");
          }
        })
        .catch((error) => alert(error));
    };
  
    const toggleCategory = (categoryId) => {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    };
  
    const filteredExpenses = useMemo(() => {
      let filtered = expenses;
  
      // Filter by selected categories
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((expense) => selectedCategories.includes(expense.category));
      }
  
      // Filter by search term (search in description)
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      return filtered;
    }, [expenses, selectedCategories, searchTerm]);
  
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
  
    return (
      <div className="space-y-6 w-full">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Filtered total</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Expense</h3>
              <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold">${averageExpense.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Per filtered expense</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Expense Categories</h3>
              <FontAwesomeIcon icon={faList} className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold">{categories.length}</div>
            <p className="text-xs text-gray-500">Total categories</p>
          </div>
        </div>
  
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Expense Trend</h4>
              <div className="">
                <ExpenseLine expenses={expenses} categories={categories} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Expense Distribution</h4>
              <div className="">
                <ExpenseChart expenses={expenses} categories={categories} />
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto"
              />
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
  
          {isFilterOpen && (
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Filter by Category:</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCategories.includes(category.id)
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
  
          <ul className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <li key={expense.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                    <p className="text-xs text-gray-500">{getCategoryName(expense.category)}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-600 text-white">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </span>
                    <Link to={`/edit-expense/${expense.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button onClick={() => deleteExpense(expense.id)} className="ml-2 text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }