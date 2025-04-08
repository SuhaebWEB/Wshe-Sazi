import { Navigate, Outlet } from "react-router-dom";  

const GuestLayout = () => { 
    const token = localStorage.getItem("token");
    const user = token ? true : false;
    return ( 
        !user ? <Outlet /> : <Navigate to="/" />
     );
}
 
export default GuestLayout;