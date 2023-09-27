import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate} from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../pages/LoginPage";
const CustomerProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [user,setUser]= useContext(AuthContext);
    if(user === null || user.userType != "Customer"){
        alert("Cannot access route as admin");return <Navigate to="/"></Navigate>}
    else return(
        <>{props.children}</>
    )
}

export default CustomerProtectedRoute