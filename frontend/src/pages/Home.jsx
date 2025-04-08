import SearchBar from "../Components/SearchBar";   
import UseAuth from "../Auth/AuthContext";
import axios from "axios";
import { useEffect } from "react";

window.addEventListener("DOMContentLoaded", () => {
    // Get user role (Replace this with actual authentication logic)
    const userRole = localStorage.getItem("role"); // Example: "admin" is 1 or "moderator" is 2

    if (!sessionStorage.getItem("visited")) {
        sessionStorage.setItem("visited", "true"); 

        if (userRole === "1") {
            window.location.href = "/admin"; 
        } else if (userRole === "2") {
            window.location.href = "/moderator";
        }
    }
});



const searchBar = () => {  
    const { loading } = UseAuth(); 
    return (
        <>
            <div className="flex h-screen flex-col justify-center items-center"> 
                {loading ? (
                            <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                            </div>
                ) :(
                    <SearchBar style="h-screen" />
                    )
                }
            </div>

        </>
    );
};

export default searchBar;