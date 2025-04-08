import { Link } from "react-router-dom";
import { useState } from "react"; 
import useAuth from "../Auth/AuthContext";

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const { login, error,loading } = useAuth();
    
    
    const handleLogin = async(e) => {
        e.preventDefault(); 

        await login({ email, password });
    };
    return (
        <>

            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center 1.5xl:flex-row-reverse ">
                {
                    loading && (
                        <>
                            <div className="absolute h-screen w-full bg-gray-50 opacity-20" />
                            <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                            </div> 
                        </>
                    )
                }
                <div className="font-rabar font-bold text-2xl text-white text-right 1.5xl:mb-[357px] 1.5xl:mr-[20px]">
                    <Link to="/" className="block mb-10" style={{ textDecoration: "none" }}>
                        گەڕانەوە ←
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-around w-[350px] h-[475px] bg-white rounded-[21px] shadow-lg 1.5xl:mr-[7vw]">
                    {/* Title */} 

                        <div className="font-rabar font-bold text-2xl text-right text-black">
                            وشەسازی
                        </div>
                        <div className="">
                            {/* Email Section */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="font-rabar font-bold text-xl text-right text-black mb-2">
                                    ئیمەیڵ
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full h-[40px] ${error?.email ? "border-red-500":"border-[#155DFC]"} bg-[#EDEDED] border-b-[4px]  rounded-[6px] focus:outline-none`}
                                />
                                {
                                    error?.email && <div className="text-red-500 text-sm mt-2">{error?.email}</div>
                                }
                            </div>

                            {/* Password Section */}
                            <div className="flex flex-col gap-2 w-full mt-4">
                                <label className="font-rabar font-bold text-xl text-right text-black mb-2">
                                    وشەی تێپەڕ
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-[300px] h-[40px] bg-[#EDEDED] border-b-[4px] ${error?.password ? "border-red-500":"border-[#155DFC]"} rounded-[6px] focus:outline-none`}
                                />
                                {
                                    error?.password && <div className="text-red-500 text-sm mt-2">{error?.password}</div>
                                }
                            </div>

                        </div> 
                            <div className="w-[107px] h-[45px] bg-[#155DFC] flex items-center justify-center rounded 
                                            1.5xl:w-[125px] 1.5xl:h-[55px] 1.5xl:ml-3
                                            hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                <button onClick={handleLogin}  className="font-rabar font-bold text-lg text-white w-full h-full"> چوونەژوورەوە </button>

                            </div>  
                </div>
            </div>

        </>
    );
}

export default login;