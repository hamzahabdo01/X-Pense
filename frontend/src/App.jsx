// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AuthRedirect from "./components/AuthRedirect";
// import NavBar from "./components/NavBar";
// import EditExpense from "./pages/EditExpense";

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

// function App() {
//   const location = useLocation();

//   const hideNavBarPaths = ["/dashboard", "/edit-expense"];

//   const shouldHideNavBar = hideNavBarPaths.some(path =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <>
//       {!shouldHideNavBar && <NavBar />}
//       <Routes>
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={
//             <AuthRedirect>
//               <Login />
//             </AuthRedirect>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <AuthRedirect>
//               <RegisterAndLogout />
//             </AuthRedirect>
//           }
//         />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// export default AppWrapper;

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Lazy load components
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const EditExpense = React.lazy(() => import("./pages/EditExpense"));
const NavBar = React.lazy(() => import("./components/NavBar"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const AuthRedirect = React.lazy(() => import("./components/AuthRedirect"));

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const location = useLocation();

  const hideNavBarPaths = ["/dashboard", "/edit-expense"];
  const shouldHideNavBar = hideNavBarPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!shouldHideNavBar && <NavBar />}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <RegisterAndLogout />
            </AuthRedirect>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
