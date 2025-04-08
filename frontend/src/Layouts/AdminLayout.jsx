import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../Auth/AuthContext";

const AdminLayout = () => {   
    const token = localStorage.getItem("token"); 
    const users = token ? true : false;
    const role = localStorage.getItem('role')
    return ( 
        (users && role === "1") ? <Outlet /> : <Navigate to="/login" />
     );
}
 
export default AdminLayout;