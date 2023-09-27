import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate} from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../pages/LoginPage";
const AdminProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [user,setUser]= useContext(AuthContext);
    if(user === null || user.userType != "Admin"){
        alert("Cannot access route as customer");
        return <Navigate to="/"></Navigate>
    }
    else return(
        <>{props.children}</>
    )
}

export default AdminProtectedRoute