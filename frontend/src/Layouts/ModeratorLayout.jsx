import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../Auth/AuthContext"; 

const ModeratorLayout = () => {    
    const token = localStorage.getItem("token"); 
    const users = token ? true : false;
    const role = localStorage.getItem('role')
    return ( 
        (users && role === '2')  ? <Outlet /> : <Navigate to="/login" />
     );
}
 
export default ModeratorLayout;