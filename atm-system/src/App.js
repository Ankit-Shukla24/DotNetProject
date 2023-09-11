import logo from './logo.svg';
import './App.css';
import UserDetails from './pages/UserDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

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
  }
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
