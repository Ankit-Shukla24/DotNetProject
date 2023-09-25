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
import MiniStatemtent from './pages/MiniStatement';
import EditCustomerPage from "./pages/EditCustomerPage"
import ChequeDeposit from './pages/ChequeDeposit';
import PinChange from './pages/PinChange';
import ChangePassword from './pages/ChangePassword';
import DisableUser from './pages/DisableUser';
import EnableUser from './pages/EnableUser';
import Navbar from './components/Navbar/Navbar';
import EditAccountPage from './pages/EditAccountPage';
import ViewUser from './pages/ViewUser';

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
    element: <ProtectedRoute><UserDetails /></ProtectedRoute>
  },
  {
    path: "/account",
    element: <ProtectedRoute><AccountDetails /></ProtectedRoute>
  },
  {
    path: "/withdraw",
    element: <ProtectedRoute><Withdrawal /></ProtectedRoute>
  },
  {
    path: "/deposit",
    element: <ProtectedRoute><ChequeDeposit /></ProtectedRoute>
  },
  {
    path: "/transfer",
    element: <ProtectedRoute><FundTransfer /></ProtectedRoute>
  },
  {
    path: "/pinchange",
    element: <ProtectedRoute><PinChange /></ProtectedRoute>
  }, 
  {
    path: "/statement",
    element: <ProtectedRoute><MiniStatemtent /></ProtectedRoute>
  },
  {
    path: "/changepassword",
    element: <ProtectedRoute><ChangePassword/></ProtectedRoute>
  },
  {
    path: "/disableuser",
    element: <ProtectedRoute><DisableUser/></ProtectedRoute>
  },
  {
    path: "/enableuser",
    element: <EnableUser/>
  },
  {
    path: "/customer/:id",
    element: <ProtectedRoute><ViewUser/></ProtectedRoute>
  },
])
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar/>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
