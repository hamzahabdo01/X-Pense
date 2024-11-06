// import React, { useState, useEffect, useMemo } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faPlus, faSignOutAlt, faDollarSign, faChartBar, faList, faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
// // import api from "../api";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import CreateExpense from "../components/CreateExpense";
// import DashboardContent from "../components/DashboardContent";
// // import ExpenseChart from '../components/ExpenseChart'; // Doughnut chart
// // import ExpenseLine from '../components/ExpenseLine';   // Line chart
// // import SideNav from "../components/SideNav";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [showDeletePopup, setShowDeletePopup] = useState(false);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         // return <DashboardContent setShowDeletePopup={setShowDeletePopup} />;
//         return <DashboardContent setShowDeletePopup={setShowDeletePopup} />;
//       case "create-expense":
//         return <CreateExpense />;
//       default:
//         return <DashboardContent />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-teal-600">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-100 shadow-md">
//         <div className="p-4">
//           <h1 className="text-2xl font-bold text-gray-800">X-Pense</h1>
//         </div>
//         <nav className="mt-6">
//           <button
//             className={`w-full flex items-center px-4 py-2 text-left ${
//               activeTab === "dashboard" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("dashboard")}
//           >
//             <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4" />
//             Dashboard
//           </button>
//           <button
//             className={`w-full flex items-center px-4 py-2 text-left ${
//               activeTab === "create-expense" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("create-expense")}
//           >
//             <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
//             Create Expense
//           </button>
//           <Link to='/logout' className="w-full flex items-center px-4 py-2 text-left text-red-500 hover:bg-red-50">
//             <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
//             Logout
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-8">
//         <div className="max-w-4xl mx-auto">
//           {renderContent()}
//         </div>
//       </main>

//       {showDeletePopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
//               Expense Deleted Successfully!
//             </h2>
//             <p className="text-gray-700 text-center mb-6">The expense has been removed from your records.</p>
//             <button
//               onClick={() => setShowDeletePopup(false)}
//               className="w-full bg-teal-500 text-white py-3 px-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client'

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faPlus, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import CreateExpense from "../components/CreateExpense"
import DashboardContent from "../components/DashboardContent"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent setShowDeletePopup={setShowDeletePopup} />
      case "create-expense":
        return <CreateExpense />
      default:
        return <DashboardContent />
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-teal-600">
      {/* Mobile Header */}
      <header className="md:hidden bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">X-Pense</h1>
        <button onClick={toggleSidebar} className="text-gray-600">
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-100 shadow-md`}
      >
        <div className="p-4 hidden md:block">
          <h1 className="text-2xl font-bold text-gray-800">X-Pense</h1>
        </div>
        <nav className="mt-6">
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "dashboard" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab("dashboard")
              setIsSidebarOpen(false)
            }}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4" />
            Dashboard
          </button>
          <button
            className={`w-full flex items-center px-4 py-2 text-left ${
              activeTab === "create-expense" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab("create-expense")
              setIsSidebarOpen(false)
            }}
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
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
      </main>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-4 text-center">
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
  )
}