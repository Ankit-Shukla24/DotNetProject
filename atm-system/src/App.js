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
import FundTransfer from './pages/FundTransfer';
import UserHomePage from './pages/UserHomePage';
import ChequeDeposit from './pages/ChequeDeposit';

const router = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoute><HomePage/></ProtectedRoute>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path: "/user",
    element: <ProtectedRoute><UserDetails/></ProtectedRoute>
  },
  {
    path: "/account",
    element: <ProtectedRoute><AccountDetails/></ProtectedRoute>
  },
  {
    path: "/withdraw",
    element: <ProtectedRoute><Withdrawal/></ProtectedRoute>
  },
  {
    path: "/deposit",
    element: <ProtectedRoute><ChequeDeposit/></ProtectedRoute>
  },
  {
    path: "/transfer",
    element: <ProtectedRoute><FundTransfer/></ProtectedRoute>
  },
])
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <RouterProvider router={router}/></AuthProvider>
    </div>
  );
}

export default App;
