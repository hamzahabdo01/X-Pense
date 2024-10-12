// // import { useState, useEffect } from "react";
// // import api from "../api";
// // import Expense from '../components/Expense';
// // import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
// // import ExpenseLine from '../components/ExpenseLine';   // Line chart

// // function Dashboard() {
// //     const [expenses, setExpenses] = useState([]);
// //     const [categories, setCategories] = useState([]);

// //     useEffect(() => {
// //         getExpenses();
// //         getCategories();
// //     }, []);

// //     const getExpenses = () => {
// //         api
// //             .get("/api/expenses/")
// //             .then((res) => res.data)
// //             .then((data) => {
// //                 setExpenses(data);
// //             })
// //             .catch((err) => alert(err));
// //     };

// //     const getCategories = () => {
// //         api
// //             .get("/api/categories/")
// //             .then((res) => res.data)
// //             .then((data) => {
// //                 setCategories(data);
// //             })
// //             .catch((err) => alert(err));
// //     };

// //     const deleteExpense = (id) => {
// //         api
// //             .delete(`/api/expenses/delete/${id}/`)
// //             .then((res) => {
// //                 if (res.status === 204) {
// //                     alert("Expense deleted!");
// //                     getExpenses();
// //                 } else {
// //                     alert("Failed to delete expense.");
// //                 }
// //             })
// //             .catch((error) => alert(error));
// //     };

// //     return (
// //         <div className="p-8 bg-teal-100 min-h-screen">
// //             <div className="max-w-7xl mx-auto">
// //                 <h2 className="text-4xl font-extrabold text-teal-800 mb-8 text-center">Expenses Dashboard</h2>
                
// //                 {/* Overview Section */}
// //                 <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
// //                     <h3 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h3>
// //                     <div className="flex space-x-20 items-center">
// //                         <div className="w-1/2 p-4">
// //                             {/* Line Chart */}
// //                             <ExpenseLine expenses={expenses} categories={categories} />
// //                         </div>
// //                         <div className="w-1/2 p-4">
// //                             {/* Doughnut Chart */}
// //                             <ExpenseChart expenses={expenses} categories={categories} />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Expense List */}
// //                 <div className="grid grid-cols-1 gap-6 mt-8">
// //                     {expenses.map((expense) => (
// //                         <Expense key={expense.id} expense={expense} onDelete={deleteExpense} />
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Dashboard;


// import { useState, useEffect } from "react";
// import api from "../api";
// import Expense from '../components/Expense';
// import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
// import ExpenseLine from '../components/ExpenseLine';   // Line chart

// function Dashboard() {
//     const [expenses, setExpenses] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         getExpenses();
//         getCategories();
//     }, []);

//     const getExpenses = () => {
//         api
//             .get("/api/expenses/")
//             .then((res) => res.data)
//             .then((data) => {
//                 setExpenses(data);
//             })
//             .catch((err) => alert(err));
//     };

//     const getCategories = () => {
//         api
//             .get("/api/categories/")
//             .then((res) => res.data)
//             .then((data) => {
//                 setCategories(data);
//             })
//             .catch((err) => alert(err));
//     };

//     const deleteExpense = (id) => {
//         api
//             .delete(`/api/expenses/delete/${id}/`)
//             .then((res) => {
//                 if (res.status === 204) {
//                     alert("Expense deleted!");
//                     getExpenses();
//                 } else {
//                     alert("Failed to delete expense.");
//                 }
//             })
//             .catch((error) => alert(error));
//     };

//     return (
//         <div className="p-8 bg-teal-100 min-h-screen">
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Overview Section */}
//                 <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
//                     <h3 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h3>
//                     <div className="flex space-x-96 items-center">
//                         <div className="w-1/3 p-4">
//                             {/* Line Chart */}
//                             <ExpenseLine expenses={expenses} categories={categories} />
//                         </div>
//                         <div className="w-1/3 p-4">
//                             {/* Doughnut Chart */}
//                             <ExpenseChart expenses={expenses} categories={categories} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Expense List */}
//                 <div className="grid grid-cols-1 gap-6 mt-8">
//                     {expenses.map((expense) => (
//                         <Expense key={expense.id} expense={expense} onDelete={deleteExpense} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;




import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faPlus, faSignOutAlt, faDollarSign, faChartBar, faList, faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons"
import api from "../api"
import { Link, useParams } from "react-router-dom"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />
      case "create-expense":
        return <CreateExpense />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">X-Pense</h1>
        </div>
        <nav className="mt-6">
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "dashboard" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4" />
            Dashboard
          </button>
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "create-expense" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-100"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{activeTab === "dashboard" ? "Dashboard" : "Create Expense"}</h2>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}


function DashboardContent() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  const getExpenses = () => {
    api
      .get("/api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data);
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
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Loading...";
  };

  const deleteExpense = (id) => {
    api
      .delete(`/api/expenses/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Expense deleted!");
          getExpenses();
        } else {
          alert("Failed to delete expense.");
        }
      })
      .catch((error) => alert(error));
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredExpenses = useMemo(() => {
    return selectedCategories.length === 0
      ? expenses
      : expenses.filter(expense => selectedCategories.includes(expense.category));
  }, [expenses, selectedCategories]);

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <FontAwesomeIcon icon={faDollarSign} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Filtered total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Average Expense</h3>
            <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">${averageExpense.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Per filtered expense</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Expense Categories</h3>
            <FontAwesomeIcon icon={faList} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{categories.length}</div>
          <p className="text-xs text-gray-500">Total categories</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
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
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
        <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isEditMode ? "Update Expense" : "Submit"}
                </button>
            </form>
        </div>
    );
}