import { useState } from "react";
import { Link } from "react-router-dom"; 
import UseAuth from "../../Auth/AuthContext";
const ModeratorDashboard = () => { 
    let options = [
        { label: "ڕێکخستی هەژمارەکەم", path: '/moderator/account' },
        { label: "زیادکردنی وشە", path: '/moderator/create' },
        { label: "مێژووی وشەکانم", path: '/moderator/words_history' },
        { label: "مێژووی دەنگدانەکان", path: '/moderator/voting_history' }
    ];
    const { logout,user,loading } = UseAuth();
    console.log(user?.first_name);

    const handlingLogout = () => {
        logout();
    }

    return (
        <>
            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center ">
                {
                    loading?(
                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                            </div>
                    ):(
                        <>
                            <div className="pb-10 font-bold 1.5xl:text-5xl text-2xl text-white flex items-center">
                                بەخێربێیت، {user?.first_name}
                            </div> 
                            <div className="flex flex-col items-center justify-around w-[350px] h-[475px] bg-white rounded-[21px] shadow-lg 
                                            1.5xl:w-[650px] 1.5xl:h-[60vh] 1.5xl:justify-start 1.5xl:pt-[25px]">
                                <ol className="list-none text-black  flex flex-col gap-10 justify-center items-center text-[24px] p-0 m-0
                                                1.5xl:gap-[15px]  ">
                                    {
                                        options.map(((option, index) => (
                                            <Link key={index} to={option.path} style={{ textDecoration: "none" }} className="text-black">
                                                <li className="my-li">  {option.label}  </li>
                                            </Link>
                                        )))
                                    }
                                    <button type="button" onClick={handlingLogout} className=" w-[325px] 1.5xl:w-[580px] h-[51px] rounded-full 1.5xl:rounded-[20px] 1.5xl:pr-[17px] items-center 1.5xl:justify-start bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white flex justify-around 1.5xl:justify-start ">
                                        <span> چوونەدەرەوە </span>
                                        <img
                                            src=" ../public/SVG/Exit.svg "
                                            alt="Exit Icon"
                                            className="w-[30px] h-[30px] 1.5xl:mr-auto 1.5xl:ml-5"
                                        />
                                    </button>


                                </ol>
                            </div>
                        </>
                    )
                } 
                
            </div>
        </>

    );
}

export default ModeratorDashboard;
