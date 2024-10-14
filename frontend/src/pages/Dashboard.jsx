import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSignOutAlt, faDollarSign, faChartBar, faList, faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import api from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
import ExpenseLine from '../components/ExpenseLine';   // Line chart

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent setShowDeletePopup={setShowDeletePopup} />;
      case "create-expense":
        return <CreateExpense />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-teal-300">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-100 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">X-Pense</h1>
        </div>
        <nav className="mt-6">
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "dashboard" ? "bg-teal-200 text-gray-800" : "text-gray-600 hover:bg-teal-300"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4" />
            Dashboard
          </button>
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "create-expense" ? "bg-teal-200 text-gray-800" : "text-gray-600 hover:bg-teal-300"
            }`}
            onClick={() => setActiveTab("create-expense")}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Create Expense
          </button>
          <Link to='/logout' className="w-full flex items-center px-4 py-2 text-left text-red-500 hover:bg-red-50">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
              Expense Deleted Successfully!
            </h2>
            <p className="text-gray-700 text-center mb-6">The expense has been removed from your records.</p>
            <button
              onClick={() => setShowDeletePopup(false)}
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
function DashboardContent({ setShowDeletePopup }) {
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
          setShowDeletePopup(true);
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
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-teal-100 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Filtered total</p>
        </div>
        <div className="bg-teal-100 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Average Expense</h3>
            <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${averageExpense.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Per filtered expense</p>
        </div>
        <div className="bg-teal-100 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Expense Categories</h3>
            <FontAwesomeIcon icon={faList} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{categories.length}</div>
          <p className="text-xs text-gray-500">Total categories</p>
        </div>
      </div>

      {/* Overview Section */}
        <div className="bg-teal-100 p-8 mb-12 ">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h3>
                    <div className="flex space-x-64 items-center ">
                        <div className="w-1/3 p-4">
                            {/* Line Chart */}
                            <ExpenseLine expenses={expenses} categories={categories} />
                        </div>
                        <div className="w-1/3 p-4">
                            {/* Doughnut Chart */}
                            <ExpenseChart expenses={expenses} categories={categories} />
                        </div>
                    </div>
                </div>

      {/* Search and Filter Section */}
      <div className="bg-teal-100 shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="ml-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
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
            <li key={expense.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{getCategoryName(expense.category)}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-600 text-white ">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </span>
                  <Link to={`/edit-expense/${expense.id}`} className="ml-4 text-indigo-600 hover:text-indigo-900">
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
  );
}

function CreateExpense() {
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
    <div className="bg-teal-100 shadow-lg rounded-xl p-8">
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
          Submit
        </button>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
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
