import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate} from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../pages/LoginPage";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [user,setUser]= useContext(AuthContext);
    if(user === null)
        return <Navigate to="/login"></Navigate>
    else return(
        <>{props.children}</>
    )
}

export default ProtectedRoute