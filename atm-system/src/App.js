import logo from './logo.svg';
import './App.css';
import UserDetails from './pages/UserDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AccountDetails from './pages/AccountDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Withdrawal from './pages/Withdrawal';
import FundTransfer from './pages/FundTransfer'; import MiniStatemtent from './pages/MiniStatement';
import ChequeDeposit from './pages/ChequeDeposit';
import PinChange from './pages/PinChange';
import ChangePassword from './pages/ChangePassword';
import Navbar from './components/Navbar/Navbar';
import ViewUser from './pages/ViewUser';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/user",
    element: <AdminProtectedRoute><UserDetails /></AdminProtectedRoute>
  },
  {
    path: "/account",
    element: <AdminProtectedRoute><AccountDetails /></AdminProtectedRoute>
  },
  {
    path: "/withdraw",
    element: <CustomerProtectedRoute><Withdrawal /></CustomerProtectedRoute>
  },
  {
    path: "/deposit",
    element: <CustomerProtectedRoute><ChequeDeposit /></CustomerProtectedRoute>
  },
  {
    path: "/transfer",
    element: <CustomerProtectedRoute><FundTransfer /></CustomerProtectedRoute>
  },
  {
    path: "/pinchange",
    element: <CustomerProtectedRoute><PinChange /></CustomerProtectedRoute>
  },
  {
    path: "/statement",
    element: <CustomerProtectedRoute><MiniStatemtent /></CustomerProtectedRoute>
  },
  {
    path: "/changepassword",
    element: <CustomerProtectedRoute><ChangePassword /></CustomerProtectedRoute>
  },

  {
    path: "/customer/:id",
    element: <AdminProtectedRoute><ViewUser /></AdminProtectedRoute>
  },
])
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
